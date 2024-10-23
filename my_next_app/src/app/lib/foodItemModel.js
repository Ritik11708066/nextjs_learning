import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String
    }, 
    path: {
        type: String,
    },
    description: {
        type: String,
    },
    restro_id: {
        type: mongoose.Schema.Types.ObjectId
    }
})

export default mongoose.models.foods || mongoose.model('foods', foodItemSchema)