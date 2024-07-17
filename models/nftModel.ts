import mongoose, { Schema, Document } from "mongoose";

interface NftInterface extends Document {
    tokenId: string;
    tokenAddress: string;
    metadataUrl: string;
    ownerAddress: string;
}

const nftSchema: Schema<NftInterface> = new Schema({
    tokenId: {
        type: String,
        required: true,
    },
    tokenAddress: {
        type: String,
        required: true,
    },
    metadataUrl: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        required: true,
    }
})

export const NFT = mongoose.model("NFT", nftSchema);
