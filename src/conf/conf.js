const conf = {
    appwriteendpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteprojectname: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritetableid: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwritebucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;