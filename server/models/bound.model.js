import mongoose from 'mongoose';
const BoundSchema = new mongoose.Schema({
	areaName: {
		type: String,
		trim: true,
		required: 'Area Name is required',
	},
	locationType: {
		type: String,
		enum: ['Division', 'District', 'Sub-District', 'Union'],
		required: true,
	},
	coordinates: [{}],
});

export default mongoose.model('Bound', BoundSchema);
