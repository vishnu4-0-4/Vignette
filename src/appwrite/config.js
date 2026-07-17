import { Storage, Databases, Client, Query, ID } from "appwrite";
import conf from "../conf/conf";

class Service {
    client;
    databases;
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteendpoint)
            .setProject(conf.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwritedatabaseid,
                collectionId: conf.appwritetableid,
                documentId: ID.unique(),
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(postid, { title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appwritedatabaseid,   // fixed: was appwriteDatabaseid
                collectionId: conf.appwritetableid,     // fixed: was appwriteCollectionid
                documentId: postid,
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwritedatabaseid,
                collectionId: conf.appwritetableid,
                documentId: postId
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument({   // fixed: was .get(...)
                databaseId: conf.appwritedatabaseid,
                collectionId: conf.appwritetableid,
                documentId: postId
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appwritedatabaseid,
                collectionId: conf.appwritetableid,
                queries
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwritebucketid,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwritebucketid,
                fileId: fileId
            })
            return true;   // fixed: now returns true on success like other methods
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
    try{
        const result = this.bucket.getFileView({
            bucketId: conf.appwritebucketid,
            fileId: fileId
        })
        return result.href || result;   // handles both URL object and string returns
    }catch(error){
        console.log("Error getting file preview:", error);
        return false;
    }
}
}

const service = new Service();
export default service;