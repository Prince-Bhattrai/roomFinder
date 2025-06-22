import { postModel } from "../Models/post.models.js";
import mongoose from "mongoose";
import { userModel } from "../Models/user.models.js"; // <-- Don't forget to import

export const post = async (req, res) => {
  const { title, description, city, area, roomtype, contact ,rent} = req.body;
  const video = req.file?.filename;

  try {
    if (!title || !description || !city || !area || !roomtype || !contact || !video) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // 1. Create post
    const data = new postModel({
      title,
      description,
      city,
      area,
      roomtype,
      contact,
      video,
      rent,
      user: req.userId,
    });

    await data.save();

    // 2. Push post._id into the user
    await userModel.findByIdAndUpdate(req.userId, {$push: { post: data._id },});

    res.status(200).json({
      success: true,
      message: "Post added successfully",
    });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format"
            });
        }

        const deletedPost = await postModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



export const updatepost = async (req, res) => {
    const { title, description, city, area, roomtype, contact ,rent} = req.body;
    const { id } = req.params;
   

    if (!title || !description || !city || !area || !roomtype || !contact ||!rent) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    try {
        const updateData = await postModel.findOneAndUpdate(
            { _id: id },
            { title, description, city, area, roomtype, contact,rent },
            { new: true }
        );

        if (!updateData) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updateData
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



export const getOnePost = async(req,res)=>{
    const {id} = req.params;
    try {
        const data = await postModel.findOne({_id:id})
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Post not found."
            })
        }
        res.status(200).json({
            success:true,
            message:"Post data found",
            data
        })
    } catch (error) {
        console.log("Error",error)
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

export const getAllPost = async(req,res)=>{
    try {
        const data = await postModel.find()
        if(!data){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        res.status(200).json({
            success:true,
            mesage:"All post here",
            data
        })
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }

}


// export const searchPost = async (req, res) => {
//   const { title } = req.query;

//   if (!title) {
//     return res.status(400).json({
//       success: false,
//       message: "Title is required",
//     });
//   }

//   try {
//     const data = await postModel.find({ title: title }); // ✅ await added

//     if (!data || data.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message: "No match found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Match result",
//       data,
//     });
//   } catch (error) {
//     console.log("Search error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


export const searchPost = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const data = await postModel.find({
      title: { $regex: title, $options: "i" }  // 🔥 partial + case-insensitive match
    });

    if (!data || data.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No match found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Match result",
      data,
    });
  } catch (error) {
    console.log("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
