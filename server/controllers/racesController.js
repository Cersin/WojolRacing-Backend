import Races from "~/server/models/racesModel";
import Player from "~/server/models/playersModel";
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
                from: "players",
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
                    "split": +req.query.split,
                    "season": +req.query.season
                }
            },
            {"$unwind": "$results"},
            {"$sort": {'results.position': 1}},
            {
                "$lookup": {
                    from: "players",
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
                    "split": +req.query.split,
                    "season": +req.query.season
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
                    from: "players",
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
                "split": +req.query.split,
                "season": +req.query.season
            }
        },
        {$sort: { date: 1}},
        {$project:{"track": "$track"}},
    ]);

    const users = await Races.aggregate([
        {
            "$match": {
                "split": +req.query.split,
                "season": +req.query.season
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
                from: "players",
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
                    "split": +req.query.split,
                    "season": +req.query.season
                }
            },
            {"$unwind": "$results"},
            {
                "$group": {
                    _id: "$results.player",
                    points: {$sum: "$results.points"},
                    team: {$last: "$results.team"},
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
                    avgPits: {
                        "$avg": {
                            $cond: {if: {$eq: ["$results.dnf", false]}, then: "$results.pitStops", else: null}
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
                    from: "players",
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
                  avgPits : round('$avgPits', 2),
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

const playerCard = catchAsync(async (req, res) => {
    const season1Length = 15;
    const season2Length = 14;


    const sumSeasons = season1Length + season2Length;

    const users = await Races.aggregate([
        {"$unwind": "$results"},
        {
            "$group": {
                _id: "$results.player",
                points: {$sum: "$results.points"},
                split: {$last: "$results.split"},
                races: {
                    "$sum": {
                        $cond: {if: "$results.position", then: 1, else: 0}
                    }
                },
                avgStartGridS1: { $avg: { $cond: {if: {$eq: ["$season", 1]}, then: "$results.grid", else: null} } },
                avgStartGridS2: { $avg: { $cond: {if: {$eq: ["$season", 2]}, then: "$results.grid", else: null} } },
                avgPositionS1: { $avg: { $cond: {if: {$eq: ["$season", 1]}, then: "$results.position", else: null} } },
                avgPositionS2: { $avg: { $cond: {if: {$eq: ["$season", 2]}, then: "$results.position", else: null} } },
                season1Finished: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                    [
                                        {
                                            $eq: ["$season", 1]
                                        },
                                        {
                                            $eq: ["$results.dnf", false]
                                        },
                                    ],
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
                season2Finished: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                    [
                                        {
                                            $eq: ["$season", 2]
                                        },
                                        {
                                            $eq: ["$results.dnf", false]
                                        },
                                    ],
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
                fullAttendanceS1: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                    [
                                        '$results.position',
                                        {
                                            $eq: ["$season", 1]
                                        },
                                    ],
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
                fullAttendanceS2: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                    [
                                        '$results.position',
                                        {
                                            $eq: ["$season", 2]
                                        },
                                    ],
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
                season1Attendance: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                [
                                    '$results.position',
                                    {
                                      $eq: ["$season", 1]
                                    },
                                    {
                                      $ne: ["$results.team", 'Rezerwa']
                                    }
                                ],
                                },
                            then: 1,
                            else: 0
                        }
                    }
                },
                season2Attendance: {
                    "$sum": {
                        $cond: {
                            if: {$and:
                                    [
                                        '$results.position',
                                        {
                                            $eq: ["$season", 2]
                                        },
                                        {
                                            $ne: ["$results.team", 'Rezerwa']
                                        }
                                    ],
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
            }
        },
        {
            "$lookup": {
                from: "players",
                localField: "_id",
                foreignField: "_id",
                as: "player"
            }
        },
        {"$unwind": "$player"},
        {
            "$match": {
                "races": {$gte: 5},
                "player.active": {$eq: true},
            },
        },
        {
            $project: {
                _id: '$_id' ,
                points: '$points',
                player: '$player',
                experience: {
                    $function: {
                        body: function (season1Attendance, season2Attendance, split, s1Length, s2Length, sumS)
                        {
                            if(!split) return null;
                            const sumAttendance = season1Attendance + season2Attendance;
                            const min = 30;
                            const max = split === 1 ? 99 : 90;
                            if (sumAttendance === 1) return 30;
                            if (sumAttendance ===  sumS && split === 1 && sumAttendance) return 99;
                            if (sumAttendance ===  sumS && split === 2) return 90;

                            const pointMeasureS1 = (max-min) / (s1Length);
                            const pointMeasureS2 = (max-min) / (s2Length);

                            const ratingS1 = 0.3;
                            const ratingS2 = 0.7;

                            const pointsS1 = min + (season1Attendance * pointMeasureS1);
                            const pointsS2 = min + (season2Attendance * pointMeasureS2);

                            return ((ratingS1 * pointsS1) + (ratingS2 * pointsS2)).toFixed();
                        },
                        args: ["$season1Attendance", "$season2Attendance", "$player.split", season1Length, season2Length, sumSeasons ],
                        lang: "js"
                    }
                },
                awareness: {
                    $function: {
                        body: function (season1Finished, season2Finished, split, fullAttendanceS1, fullAttendanceS2)
                        {
                            if(!split) return null;
                            const sumFinished = season1Finished + season2Finished;
                            const sumAttendance = fullAttendanceS1 + fullAttendanceS2;
                            const min = 30;
                            const max = split === 1 ? 99 : 99;
                            if (sumFinished === 0) return 30;

                            const pointMeasureS1 = (max-min) / (fullAttendanceS1);
                            const pointMeasureS2 = (max-min) / (fullAttendanceS2);

                            const ratingS1 = 0.3;
                            const ratingS2 = 0.7;

                            const pointsS1 = min + (season1Finished * pointMeasureS1);
                            const pointsS2 = min + (season2Finished * pointMeasureS2);

                            if(!pointsS1) return (pointsS2 - 5).toFixed();
                            if(!pointsS2) return (pointsS1 - 10).toFixed();
                            return ((ratingS1 * pointsS1) + (ratingS2 * pointsS2)).toFixed();
                        },
                        args: ["$season1Finished", "$season2Finished", "$player.split", "$fullAttendanceS1", "$fullAttendanceS2" ],
                        lang: "js"
                    }
                },
                pace: {
                    $function: {
                        body: function (avgGridPositionS1, avgGridPositionS2, split,  fullAttendanceS1, fullAttendanceS2)
                        {
                            const sumAttendance = fullAttendanceS1 + fullAttendanceS2;
                            const min = 30;
                            const max = split === 1 ? 99 : 80;
                            if (sumAttendance === 1) return 30;

                            const ratingS1 = 1;
                            const ratingS2 = 1.6;

                            const sumAvgGridAttendance = ((fullAttendanceS1 * avgGridPositionS1) * ratingS1) + ((fullAttendanceS2 * avgGridPositionS2) * ratingS2);
                            const wageSum = (fullAttendanceS1 * ratingS1) + (fullAttendanceS2 * ratingS2);
                            const sumAvg = sumAvgGridAttendance / wageSum;

                            const pointMeasure = (max-min) / 20;

                            const points = max - (sumAvg * pointMeasure);

                            return points.toFixed();
                        },
                        args: ["$avgStartGridS1", "$avgStartGridS2", "$player.split", "$fullAttendanceS1", "$fullAttendanceS2" ],
                        lang: "js"
                    }
                },
                racePace: {
                    $function: {
                        body: function (avgPositionS1, avgPositionS2, split,  fullAttendanceS1, fullAttendanceS2)
                        {
                            const sumAttendance = fullAttendanceS1 + fullAttendanceS2;
                            const min = 30;
                            const max = split === 1 ? 99 : 80;
                            if (sumAttendance === 1) return 30;

                            const ratingS1 = 1;
                            const ratingS2 = 1.6;

                            const sumAvgPositionAttendance = ((fullAttendanceS1 * avgPositionS1) * ratingS1) + ((fullAttendanceS2 * avgPositionS2) * ratingS2);
                            const wageSum = (fullAttendanceS1 * ratingS1) + (fullAttendanceS2 * ratingS2);
                            const sumAvg = sumAvgPositionAttendance / wageSum;

                            const pointMeasure = (max-min) / 20;

                            const points = max - (sumAvg * pointMeasure);

                            return points.toFixed();
                        },
                        args: ["$avgPositionS1", "$avgPositionS2", "$player.split", "$fullAttendanceS1", "$fullAttendanceS2" ],
                        lang: "js"
                    }
                },
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
    createRace, playerCard,  findRaces, userPoints, constructorsPoints, editRace, deleteRace, playerStatistics, getRace, formatData, userDetailsPoints,
}
