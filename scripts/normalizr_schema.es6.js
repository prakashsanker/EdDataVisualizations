import { normalize, Schema, arrayOf } from 'normalizr';

export const district = new Schema("districts");
export const school = new Schema("schools");
export const ethnicInfo  = new Schema("ethnicInfos"); //maybe I should have grades? 


district.define({
	schools: arrayOf(school)
});

school.define({
	ethnicInfos: arrayOf(ethnicInfo)
});