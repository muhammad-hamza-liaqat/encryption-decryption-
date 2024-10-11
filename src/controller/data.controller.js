const { ObjectId } = require("mongodb");
const { connectDB } = require("../config/mongoDb.client");

const defaultFunction = async (req, res) => {
    res.end("A nodeJs application!");
}



// const getData = async (req, res) => {
//     try {
//         const db = await connectDB();
//         const userModel = db.collection("users");

//         const userId = new ObjectId("66ec23c4650c7d4c2cdc639b");

//         const user = await userModel.findOne({ _id: userId });

//         console.log("User with ID:", user);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         const userTotalReferrals = user.totalReferrals;
//         const userUpdatedAt = user.updatedAt;

//         const rankCountMore = await userModel.countDocuments({
//             totalReferrals: { $gt: userTotalReferrals }
//         });

//         const rankCountSame = await userModel.countDocuments({
//             totalReferrals: userTotalReferrals,
//             updatedAt: { $gt: userUpdatedAt }
//         });

//         const sameRankUsers = await userModel.find({
//             totalReferrals: userTotalReferrals,
//             updatedAt: { $gte: userUpdatedAt }
//         }).toArray();

//         console.log("Users with the same totalReferrals and later updatedAt:", sameRankUsers);

//         const rank = rankCountMore + rankCountSame + 1;

//         res.status(200).json({
//             success: true,
//             data: {
//                 _id: user._id,
//                 name: user.username,
//                 totalReferrals: user.totalReferrals,
//                 rank: rank,
//                 sameRankUsers: sameRankUsers 
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Error calculating user rank'
//         });
//     }
// };


const getData = async (req, res) => {
    try {
        const db = await connectDB();
        const userModel = db.collection("users");

        const userId = new ObjectId("66ec23c4650c7d4c2cdc639b");

        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userTotalReferrals = user.totalReferrals;
        const userUpdatedAt = user.updatedAt;

        // Get all users to compare
        const allUsers = await userModel.find({}).toArray();

        // Calculate the rank of the main user by comparing with all users
        const rankCountMore = allUsers.filter(otherUser => 
            otherUser.totalReferrals > userTotalReferrals
        ).length;

        // Filter users with the same totalReferrals, excluding the main user
        const sameRankUsers = allUsers.filter(otherUser => 
            otherUser.totalReferrals === userTotalReferrals && 
            !otherUser._id.equals(userId)
        );

        // Create a rank mapping for same rank users based on updatedAt
        const rankedSameRankUsers = sameRankUsers.map(otherUser => {
            return {
                _id: otherUser._id,
                username: otherUser.username,
                totalReferrals: otherUser.totalReferrals,
                updatedAt: otherUser.updatedAt,
            };
        });

        // Add the main user to the ranked list
        rankedSameRankUsers.push({
            _id: user._id,
            username: user.username,
            totalReferrals: user.totalReferrals,
            updatedAt: user.updatedAt,
        });

        // Sort the combined array by updatedAt descending
        rankedSameRankUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // Reassign ranks based on the sorted order
        rankedSameRankUsers.forEach((user, index) => {
            user.rank = rankCountMore + index + 1; // Offset rank based on previous count
        });

        // Get the main user's rank
        const mainUserRank = rankedSameRankUsers.find(user => user._id.equals(userId)).rank;

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.username,
                totalReferrals: user.totalReferrals,
                updatedAt: user.updatedAt,
                rank: mainUserRank,
                sameRankUsers: rankedSameRankUsers.filter(u => u._id !== userId) // Exclude the main user
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error calculating user rank'
        });
    }
};

module.exports = {
    defaultFunction,
    getData
}
