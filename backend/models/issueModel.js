import mongoose from "mongoose";

const issueSchema = mongoose.Schema(
    {
      name: {
        type: String,
        require: [true, "please add a name"],
      },
      email: {
        type: String,
        require: [true, "please add an email"],
      },
      issue: {
        type: String,
        require: [true, "please add text."],
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("Issue", issueSchema);
  