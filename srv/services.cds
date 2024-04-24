using {sap.ui.codingExercise as db} from '../db/schema';

service BackendService {
    entity cities as projection on db.cities {
        *,
        ROUND( population / area, 2 ) as density : Double,
        (population > 1000000 ? 'Indication05' : 'Indication09') as status : String
    };

    action addCity( name: String, area: Double, population: Integer ) returns {};
}