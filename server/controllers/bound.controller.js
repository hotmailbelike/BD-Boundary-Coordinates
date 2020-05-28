import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';
import Bound from '../models/bound.model';

/*  
import BD_admin_level_2 from '../util/BD_admin_level_2.json';
import BD_admin_level_2_names from '../util/BD_admin_level_2_names.json';
import BD_admin_level_3 from '../util/BD_admin_level_3.json';
import BD_admin_level_3_names from '../util/BD_admin_level_3_names.json';

let admin_level_2 = BD_admin_level_2.boundaries;
let admin_level_2_names = BD_admin_level_2_names.boundaries;
let admin_level_3 = BD_admin_level_3.boundaries;
let admin_level_3_names = BD_admin_level_3_names.boundaries;


let newAdmin_level_2 = [],
	newAdmin_level_3 = [];

admin_level_2.forEach((e, i) => {
	newAdmin_level_2.push({
		areaName: e.name.DISTNAME.toLowerCase(),
		locationType: 'District',
		coordinates: e.geometry,
	});
});

admin_level_3.forEach((e, i) => {
	newAdmin_level_3.push({
		areaName: e.name.NAME_3.toLowerCase(),
		locationType: 'Sub-District',
		coordinates: e.geometry,
	});
});

const writeAll = async (req, res) => {
	try {
		await Bound.insertMany(newAdmin_level_2);
		await Bound.insertMany(newAdmin_level_3);
		return res.status(200);
	} catch (error) {
		console.log('writeAll -> error', error);
	}
};
*/

const filterLocation = async (req, res) => {
	try {
		let locationType = req.body.locationType;

		let bound = await Bound.find({ locationType }); /* .select('areaName locationType'); */
		res.json(bound);
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};

const getSimilarLocationNames = async (req, res) => {
	let locationType = req.body.locationType;
	let areaName = req.body.areaName;
	try {
		let bound = await Bound.find({
			locationType,
			areaName: {
				$regex: areaName,
				$options: 'i',
			},
		}).select('areaName');
		res.json(bound);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};

const getLocationBound = async (req, res) => {
	let id = req.body.id;
	// let locationType = req.body.locationType;
	// let areaName = req.body.areaName;

	try {
		let bound = await Bound.findById(id).select('coordinates');
		// let bound = await Bound.find({ locationType, areaName }).select('coordinates');

		res.json(bound);
	} catch (err) {
		console.log('getLocationBound -> err', err);
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

export default {
	/*  
  writeAll,*/
	filterLocation,
	getSimilarLocationNames,
	getLocationBound,
};
