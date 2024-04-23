using { sap.ui.codingExercise as db } from '../db/schema';

service BackendService {
    entity cities as projection on db.cities {
        *,
        ROUND(population / area, 2) as density: Double
    };
}