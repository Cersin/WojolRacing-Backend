export  class CardsRating {
    constructor(firstSeason, secondSeason) {
        this.firstSeason = firstSeason;
        this.secondSeason = secondSeason;
        this.sumSeasons = firstSeason + secondSeason;
    }

    test = (season1Attendance) => {
        return season1Attendance;
    }

    calculateExperience = function(season1Attendance, season2Attendance) {
        return this.firstSeason;
    }


}

// export  function calculateExperience(season1Attendance) {
//     return season1Attendance;
// }

export default CardsRating;

