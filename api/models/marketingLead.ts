import mongoose, { Document, Schema } from "mongoose";

export interface IMarketingLead extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  name: string;
}

const marketingLeadSchema = new Schema<IMarketingLead>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const MarketingLead = mongoose.model<IMarketingLead>(
  "MarketingLead",
  marketingLeadSchema
);
export default MarketingLead;
