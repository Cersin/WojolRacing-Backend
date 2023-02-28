import Races from "~/server/models/assettoRacesModel";
import Player from "~/server/models/assettoPlayersModel";
import mongoose from "mongoose";
import catchAsync from "~/server/utils/catchAsync";
import AppError from "~/server/utils/appError";
import round from 'mongo-round';

const ObjectId = mongoose.Types.ObjectId;

const createRace = catchAsync(async (req, res) => {
    const newRace = await Races.create(req.body);

    res.status(201).json({
        status: 'success',
        race: newRace
    })
});

const getRace = catchAsync(async (req, res) => {
    let races = await Races.aggregate([
        {
            "$match": {
                "_id": new ObjectId(req.params.id),
            }
        },
        {"$unwind": "$results"},
        {"$sort": {'results.position': 1}},
        {
            "$lookup": {
                from: "assettoplayers",
                localField: "results.player",
                foreignField: "_id",
                as: "results.playerDetails"
            },
        },
        {"$unwind": "$results.playerDetails"},
        {
            "$group": {
                _id: '$_id',
                track: {"$first": '$track'},
                season: {"$first": '$season'},
                split: {"$first": '$split'},
                date: {"$first": '$date'},
                points: {$sum: "$results.points"},
                results: {"$push": '$results'},
            }
        },
        {
            "$sort": {'date': -1},
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: races[0]
    })
});

const findRaces = catchAsync(async (req, res) => {
        let races = await Races.aggregate([
            {
                "$match": {
                    "season": req.query.season
                }
            },
            {"$unwind": "$results"},
            {"$sort": {'results.position': 1}},
            {
                "$lookup": {
                    from: "assettoplayers",
                    localField: "results.player",
                    foreignField: "_id",
                    as: "results.playerDetails"
                },
            },
            {"$unwind": "$results.playerDetails"},
            {
                "$group": {
                    _id: '$_id',
                    track: {"$first": '$track'},
                    season: {"$first": '$season'},
                    split: {"$first": '$split'},
                    date: {"$first": '$date'},
                    points: {$sum: "$results.points"},
                    results: {"$push": '$results'},
                }
            },
            {
                "$sort": {'date': -1},
            },
        ]);

        const tracks = races.map(race => race.track);

        if (req.query.number) {
            races = {...races[req.query.number], length: races.length}
        }

        res.status(200).json({
            status: 'success',
            length: races.length,
            data: {...races, tracks: tracks}
        })
});

const formatData = async (req, res) => {
    try {
        const players = await Player.find()
        const races = await Races.find()
        const copyRaces = races;

        function callback_races(results, status) {
            return new Promise((resolve, reject) => {
                for (let [index, player] of players.entries()) {
                    for (let [ind, race] of races.entries()) {
                        for (let [indexes, res] of race.results.entries()) {
                            if (player.name === res.player) {
                                // console.log(new mongoose.Types.ObjectId(player.id));
                                copyRaces[ind].results[indexes].player = new mongoose.Types.ObjectId(player.id);
                            }
                        }
                    }
                }
                resolve();
            });
        }

        callback_races().then(async () => {
            console.log('done');
            for (let race of copyRaces) {
                await Races.findByIdAndUpdate(race.id, race, {
                    new: true,
                    runValidators: false
                });
                console.log('done');
            }
        }).catch((e) => {
            console.log(e);
        })

        res.status(200).json({
            status: 'success'
        })
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e.message
        })
    }
}

const userPoints = catchAsync(async (req, res) => {
        const users = await Races.aggregate([
            {
                "$match": {
                    "season": req.query.season
                }
            },
            {"$unwind": "$results"},
            {
                "$group": {
                    _id: "$results.player",
                    points: {$sum: "$results.points"},
                    team: {$last: "$results.team"}
                }
            },
            {
                "$lookup": {
                    from: "assettoplayers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "player"
                }
            },
            {"$unwind": "$player"},
            {
                "$sort": {
                    points: -1
                }
            }
        ])
        res.status(200).json({
            status: 'success',
            data: users,
            length: users.length
        })
});

const userDetailsPoints = catchAsync(async (req, res) => {

    let tracks = await Races.aggregate([
        {
            $match: {
                "season": req.query.season
            }
        },
        {$sort: { date: 1}},
        {$project:{"track": "$track"}},
    ]);

    const users = await Races.aggregate([
        {
            "$match": {
                "season": req.query.season
            }
        },
        {"$unwind": "$results"},
        {
            "$group": {
                _id: "$results.player",
                points: {$sum: "$results.points"},
                team: {$last: "$results.team"},
                races: {$push: {
                        points: "$results.points",
                        fastestLap: "$results.fastestLap",
                        dnf: "$results.dnf",
                        position: "$results.position",
                        track: "$track"
                    }},
            }
        },
        {
            "$lookup": {
                from: "assettoplayers",
                localField: "_id",
                foreignField: "_id",
                as: "player"
            }
        },
        {"$unwind": "$player"},
        {
            "$sort": {
                points: -1
            }
        },
    ])
    res.status(200).json({
        status: 'success',
        data: users,
        length: users.length,
        tracks: tracks
    })
});

const playerStatistics = catchAsync(async (req, res) => {
        const users = await Races.aggregate([
            {
                "$match": {
                    "season": req.query.season
                }
            },
            {"$unwind": "$results"},
            {
                "$group": {
                    _id: "$results.player",
                    points: {$sum: "$results.points"},
                    firstPlaces: {
                        "$sum": {
                            $cond: {if: {$eq: ["$results.position", 1]}, then: 1, else: 0}
                        }
                    },
                    podiums: {
                        "$sum": {
                            $cond: {if: {$lte: ["$results.position", 3]}, then: 1, else: 0}
                        }
                    },
                    top10: {
                        "$sum": {
                            $cond: {
                                if: {$and: [{$gte: ["$results.position", 1]}, {$lte: ["$results.position", 10]}]},
                                then: 1,
                                else: 0
                            }
                        }
                    },
                    DNFs: {
                        "$sum": {
                            $cond: {if: {$eq: ["$results.dnf", true]}, then: 1, else: 0}
                        }
                    },
                    fastestLaps: {
                        "$sum": {
                            $cond: {if: {$eq: ["$results.fastestLap", true]}, then: 1, else: 0}
                        }
                    },
                    avgPosition: {
                        "$avg": "$results.position"
                    },
                    avgStartGrid: {
                        "$avg": "$results.grid"
                    },
                    percentageFinished: {
                        "$avg": {
                            $cond: {if: {$eq: ["$results.dnf", false]}, then: 1, else: 0}
                        }
                    },
                    top1Grid: {
                        "$sum": {
                            $cond: {if: {$eq: ["$results.grid", 1]}, then: 1, else: 0}
                        }
                    },
                    top3Grid: {
                        "$sum": {
                            $cond: {if: {$lte: ["$results.grid", 3]}, then: 1, else: 0}
                        }
                    },
                    top10Grid: {
                        "$sum": {
                            $cond: {
                                if: {$and: [{$gte: ["$results.grid", 1]}, {$lte: ["$results.grid", 10]}]},
                                then: 1,
                                else: 0
                            }
                        }
                    },
                    races: {
                        "$sum": {
                            $cond: {if: "$results.position", then: 1, else: 0}
                        }
                    },
                    gain: {
                        "$avg": {
                            $subtract: ["$results.grid", "$results.position"]
                        }
                    }
                }
            },
            {
                "$lookup": {
                    from: "assettoplayers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "player"
                }
            },
            {"$unwind": "$player"},
            {
              $project: {
                  _id: '$_id' ,
                  points: '$points',
                  player: '$player',
                  team: '$team',
                  firstPlaces: '$firstPlaces',
                  podiums: '$podiums',
                  top10: '$top10',
                  DNFs: '$DNFs',
                  fastestLaps: '$fastestLaps',
                  avgPosition : round('$avgPosition', 2),
                  avgStartGrid : round('$avgStartGrid', 2),
                  percentageFinished : round('$percentageFinished', 2),
                  top1Grid: '$top1Grid',
                  top3Grid: '$top3Grid',
                  top10Grid: '$top10Grid',
                  races: '$races',
                  gain : round('$gain', 2),
              }
            },
            {
                "$sort": {
                    points: -1
                }
            }
        ])
        res.status(200).json({
            status: 'success',
            data: users,
            length: users.length
        })
});

const constructorsPoints = catchAsync(async (req, res) => {
        const constructors = await Races.aggregate([
            {
                "$match": {
                    "split": +req.query.split,
                    "season": +req.query.season
                },
            },
            {"$unwind": "$results"},
            {
                "$group": {
                    _id: {$cond: {
                            if: {$eq: ["$results.team", 'Rezerwa']},
                            then: null,
                            else: "$results.team"
                        }},
                    points: {$sum: {
                            $cond: {
                                if: {$eq: ["$results.team", 'Rezerwa']},
                                then: 0,
                                else: "$results.points"
                            }
                        }}
                }
            },
            {
                "$sort": {
                    points: -1
                }
            }
        ])

        const response = constructors.filter((el => el._id !== null));

        res.status(200).json({
            status: 'success',
            data: response,
            length: response.length
        })
})

const editRace = catchAsync(async (req, res, next) => {
        const race = await Races.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!race) return next(new AppError('Nie ma wyścigu o takim id', 404))

        res.status(200).json({
            status: 'success',
            data: {
                race
            }
        })
});

const deleteRace = catchAsync(async (req, res, next) => {
        const race = await Races.findByIdAndDelete(req.params.id);
        if (!race) return next(new AppError('Nie ma wyścigu o takim id', 404))

        res.status(200).json({
            status: 'deleted'
        });
});

export default {
    createRace, findRaces, userPoints, constructorsPoints, editRace, deleteRace, playerStatistics, getRace, formatData, userDetailsPoints
}
