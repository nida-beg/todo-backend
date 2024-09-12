module.exports=mongoose=> {
    const Task= mongoose.model("task",mongoose.Schema(
        {
            title: String,
            description: String,
            status:{
                type: String,
                enum:["completed","not_completed","in_progress"],
                default:"not_completed"
            }

        },
        {timestamps: true}
    )
    );
    return Task;
    
};