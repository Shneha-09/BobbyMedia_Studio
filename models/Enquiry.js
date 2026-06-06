import mongoose from 'mongoose';
const EnquirySchema=new mongoose.Schema({name:{type:String,required:true,trim:true},mobile:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true},eventCategory:{type:String,required:true},weddingType:String,priceCategory:String,customBudget:String,message:String,status:{type:String,enum:['New','Contacted','Booked','Rejected'],default:'New'}},{timestamps:true});
export default mongoose.models.Enquiry||mongoose.model('Enquiry',EnquirySchema);
