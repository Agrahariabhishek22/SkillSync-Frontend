const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // create entry in DB
    const CategoryDetails = await Category.create({
      name,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// show all Categories present
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true })
    .populate("courses");
    return res.status(200).json({
      success: true,
      allCategory,
      message: "All Category are shown successully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// category page details
exports.categoryPageDetails = async (req, res) => {
  // get categoryId
  // get courses from the category
  // validation
  // get courses for different categories
  // get top selling courses
// return response

  try {
    const { categoryId } = req.body;
    const selectedCategory = await Category.find({ _id: categoryId })
        .populate("courses")
        .exec();
    if(!selectedCategory){
        return res.status(404).json({
            success:false,
            message:'Data not found'
        })
    }    
    // get courses for different categories 
    const differentCategories=await Category.find({_id:{$ne:categoryId}})
        .populate('courses')
        .exec();

    // get top selling courses

    // return response
    return res.status(200).json({
        success:true,
        data:{
            selectedCategory,
            differentCategories
        },  
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
    
  }
};
