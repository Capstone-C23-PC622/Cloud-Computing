# Cloud-Computing
# Dokumentasi API - SiapaBisa C23-PC622 

Dokumentasi ini menjelaskan tentang cara mengakses aplikasi mobile produk capstone tim kami yaitu SiapaBisa dari mulai register hingga CRUD.

## Tech
- Menggunakan NodeJs
- Framework Express
- Database MongoDb 

## Features
- Register / Login
- CRUD Biodata Pelamar / Pengusaha
- CRUD Lowongan 
- CRUD Profile

## Installation

Untuk menjalakankan Rest-API ini kita harus menginstall beberapa Library

Install the dependencies and devDependencies and start the server.

```sh
npm install express nodemon jsonwebtoken cors bcrypt mongodb mongoose multer path moment dateformat body-parser

```

Untuk menjalankannya ketikan pada terminal : 

```sh
npm run start
```

Jika berhasil dijalankan akan menghasilkan output : 

```sh
Server berjalan pada port 5001
Database Terhubung
```

## Endpoint

http://localhost:port/

## TEST
- URL
 -- /
- Method
 -- POST
- Response : 

```sh
{
		Response Success!!
}
```
## REGISTER
- URL
 -- /user/registrasi
- Method
 -- POST
- 	Request Body
    - username as string 
    -  email as string, must be unique
    - password as string, must be at least 6 characters 
    - role as Number
- Response : 
```sh
{
	“error” : false,
	“message” : “Akun berhasil terdaftar”,
	“status” :  “200”
}
```

## LOGIN
- URL
 -- /user/login
- Method
 -- POST
- 	Request Body
    - username as String 
    - password as String
- Response : 
```sh
{
    		"error": false,
    		"status": 200,
    		"message": "Login Success",
    	"data": {
                "token": "Token",
        		"user": {
            		"_id": "Id",
            		"username": "Username",
            		"email": "Email",
            		"password": “Password",
            		"role": 1,
            		"createdAt": "2023-05-25T11:33:51.569Z",
            		"updatedAt": "2023-05-25T11:33:51.569Z"
        			}
    		}
```

## Add New Biodata User
- URL
 -- /user/biodata
- Method
 -- POST
- 	Request Body
    - userId as UserId
    - nama as String
    - birthday as Number
    - alamat as String
    - deskripsiDiri as String
    - pendidikan as String
    - pengalaman as String
    - keterampilan as String
    - peminatan as String
- Response : 
```sh
{
            "error": false,
    		"message": "Berhasil membuat biodata",
    		"isEmpty": true,
    		"status": 200
}
```
## Biodata User by Id
- URL
 -- /user/biodata/Id
- Method
 -- GET
- Response : 
```sh
{
    "error": false,
    "message": "Berhasil memuat data",
    "isVerified": true,
    "data": {
        "birthday": {
            "day": 14,
            "month": 11,
            "year": 2002
        },
        "_id": "648ad6354532996a611d9624",
        "userId": "6479bae25913e62cc374d0bd",
        "nama": "Test 123 Mamah Aku Takut",
        "alamat": "Jl. Kambing No. 9",
        "deskripsiDiri": "Saya adalah seorang Mahasiswa Informatika",
        "pendidikan": "S1/D4",
        "pengalaman": "Pernah bekerja selama 1 tahun di perusahaan tech",
        "keterampilan": "Teknologi",
        "peminatan": "Freelance",
        "createdAt": "2023-06-15T09:13:25.736Z",
        "updatedAt": "2023-06-15T09:13:25.736Z",
        "__v": 0
    },
    "status": 200
```
## Biodata Update User by Id
- URL
 -- /user/biodata/Id
- Method
 -- PUT
- 	Request Body
    - userId as UserId
    - nama as String
    - birthday as Number
    - alamat as String
    - deskripsiDiri as String
    - pendidikan as String
    - pengalaman as String
    - keterampilan as String
    - peminatan as String
- Response : 
```sh
{
            "error": false,
    		"message": "Biodata berhasil diubah",
    		isVerified: true,
            status: status
}
```

## Biodata Delete User by Id
- URL
 -- /user/biodata/Id
- Method
 -- DELETE
- Response : 
```sh
{
        "error": false,
        "message": "Biodata berhasil dihapus",
        "isEmpty": true,
        "status": 200
}
```

## Add New Lowongan Kerja
- URL
 -- /pengusaha/loker
- Method
 -- POST
- 	Request Body
    - userId as UserId
    - namaPerushaan as String
    - lowongan as String
    - jenisLowongan as String
    - pendidikan as String
    - pengalaman as String
    - lokasi as String
    - deskripsi as String
    - image as File
- Response : 
```sh
{
        "error": false,
        "message": "Berhasil membuat Loker",
        "isEmpty": true,
        "status": 200
}
```

## Lowongan User by Id
- URL
 -- /pengusaha/loker/Id
- Method
 -- GET
- Response : 
```sh
{
    "error": false,
    "message": "Berhasil memuat data",
    "isVerified": true,
    "data": {
        "_id": "6488916936735963098907bd",
        "userId": "6471fd5b56f645f3232e1e34",
        "namaPerusahaan": "Kedai Robocop",
        "lowongan": "FnB",
        "jenisLowongan": "Barista",
        "pendidikan": "SMA/SMK",
        "pengalaman": "Attitude Baik",
        "lokasi": "Lokasi Jl Hasannudin no 33",
        "deskripsi": "dibutuhkan 2 posisi",
        "image": "https://storage.googleapis.com/backend-388012.appspot.com/20230613-225520",
        "createdAt": "2023-06-13T15:55:21.709Z",
        "updatedAt": "2023-06-13T15:55:21.709Z",
        "__v": 0
    },
    "status": 200
}
```

## GET ALL Lowongan User by Id
- URL
 -- /pengusaha/loker/
- Method
 -- GET
- Response : 
```sh
 {
            "_id": "64809b94eca62992ae5b400b",
            "namaPerusahaan": "Kedai Kopi Janjiw",
            "jenisLowongan": "Barista",
            "pendidikan": "SMA/SMK",
            "pengalaman": "Attitude yang bowlehh",
            "lokasi": "Lokasi Jl Geriatri no 12",
            "image": "https://storage.googleapis.com/backend-388012.appspot.com/20230607-150035",
            "createdAt": "2023-06-07T15:00:36.685Z",
            "updatedAt": "2023-06-07T15:00:36.685Z",
            "__v": 0
        		},
       		 {
            "_id": "64809c2beca62992ae5b400e",
            "namaPerusahaan": "Kedai Kopi ulala",
            "jenisLowongan": "Barista",
            "pendidikan": "SMA/SMK",
            "pengalaman": "Attitude keren",
            "lokasi": "Lokasi Jl Geriatri no 69",
            "image": "https://storage.googleapis.com/backend-388012.appspot.com/20230607-150306",
            "createdAt": "2023-06-07T15:03:07.083Z",
            "updatedAt": "2023-06-07T15:03:07.083Z",
            "__v": 0
        }
   		 ],
   		 "status": 200
}
```

## Loker Delete User by Id
- URL
 -- /pengusaha/loker/id
- Method
 -- DELETE
- Response : 
```sh
{
    "error": false,
    "message": "Loker berhasil dihapus",
    "isEmpty": true,
    "status": 200
}
```

## Add New Profile Usaha
- URL
 -- /pengusaha/profile
- Method
 -- POST
- 	Request Body
    - userId as UserId
    - namaUsaha as String
    - alamat as String
    - deskripsiUsaha as String
    - bidangUsaha as String
    - image as File
- Response : 
```sh
{
    "error": false,
    "message": "Berhasil membuat Profile Usaha",
    "isEmpty": true,
    "status": 200
}
```

## Profile Usaha by Id
- URL
 -- /pengusaha/profile/id
- Method
 -- GET
- Response : 
```sh
{
    "error": false,
    "message": "Berhasil memuat data",
    "isVerified": true,
    "data": {
        "_id": "648aaa1611306d97d793a463",
        "userId": "64887a9090292e8d4754d069",
        "namaUsaha": "PT FlopWorks",
        "alamat": "Jl. Swadaya V",
        "deskripsiUsaha": "Software house",
        "bidangUsaha": "Teknologi",
        "image": "https://storage.googleapis.com/backend-388012.appspot.com/20230613-22552",
        "createdAt": "2023-06-15T06:05:10.077Z",
        "updatedAt": "2023-06-15T06:05:10.077Z",
        "__v": 0
    },
    "status": 200
}
```
## Profile Usaha Update User by Id
- URL
 -- /pengusaha/profile/id
- Method
 -- PUT
- 	Request Body
     - userId as UserId
    - namaUsaha as String
    - alamat as String
    - deskripsiUsaha as String
    - bidangUsaha as String
    - image as File
- Response : 
```sh
{
            "error": false,
    		"message": "Profile Usaha berhasil diubah",
    		isVerified: true,
            status: status
}
```

## Loker Delete User by Id
- URL
 -- /pengusaha/profile/id
- Method
 -- DELETE
- Response : 
```sh
{
    "error": false,
    "message": "Profile Usaha berhasil dihapus",
    "isEmpty": true,
    "status": 200
}
```


## License

rapl 2023.

**Capstone Bangkit 2023 Batch 1 :D**

