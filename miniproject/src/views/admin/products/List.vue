<template>
    <div class="product-list mb-5">
        <div class="container">
            <div class=" d-flex justify-content-beweent princing-header py-3 pt-md-3 pb-md-4 mx-auto text-center ">
                <h2 class="display-4">Product Management</h2>
            </div>


            <div class="d-flex justify-content-between mb-3">
                <div class="function_export d-flex ">
                    <button @click="exportPDF" class="btn btn-primary" style="margin-right: 10px;">Export PDF</button>
                    <button @click="exportCSV" class="btn btn-primary">Export CSV</button>
                    <div class="import-product" style="margin-left: 10px;">
                        <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload">
                        <button class="btn btn-primary import-button" @click="triggerFileInput">Import CSV</button>
                    </div>
                </div>

                <div class="from-search d-flex">
                    <input v-model="searchKeyword" type="text" placeholder="Search by name" class="form-control"
                        style="width: 200px; margin-right: 10px;">
                    <button @click="searchProduct" class="btn btn-primary">Search</button>
                </div>

            </div>
            <!-- <div class="product-items  table-wrapper-scroll-y my-custom-scrollbar mb-3 text-center ">
                <table class="table table-fixed table-bordered table-striped mb-0" width="100%">
                    <thead style="position: sticky; top: 0">
                        <tr>
                            <th scope="col">Stt</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style="max-height: 200px; overflow-y: scroll">
                        <tr :key="index" v-for="(product, index) in products">
                            <td scope="col"> {{ index }}</td>
                            <td><img :src="product.image" style="width:60px"></td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }} VND</td>
                            <td>{{ product.description }}</td>
                            <td>
                                <button class="btn btn-danger mx-1" @click="onDelete(product.id)">Delete</button>
                                <router-link :to="{ name: 'product.update-product', params: { id: product.id } }">
                                    <button class="btn btn-success mx-1">Edit</button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
            <span>Border: <el-switch v-model="parentBorder" /></span>
            <el-table :data="products" style="width: 100%" height="530" :border="parentBorder">
                <el-table-column fixed type="index" label="STT" width="60" />
                <el-table-column prop="image" label="Image" width="120">
                    <template #default="{ row }">
                        <img :src="row.image" style="width:80px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Name" width="210" />
                <el-table-column prop="price" label="Price" width="150" :sort-by="'price'" :sortable="true"
                    :formatter="(row) => `${row.price} VND`" :type="'number'">
                    <!-- <template #default="{ row }">
                        <span>{{ row.price }} VND</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="description" label="Description" width="460" />
                <el-table-column label="Operations" width="180" prop="id" fixed="right">
                    <template #default="{ row }">
                        <el-button type="danger" size="big" @click="onDelete(row.id)"
                            style="margin-right: 10px;">Delete</el-button>
                        <router-link :to="{ name: 'product.update-product', params: { id: row.id } }">
                            <el-button type="primary" size="big">Edit</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="create-product">
                <router-link to="/admin/products/create-new" class="text-white" style="margin-top: 20px;">
                    <button class="btn btn-primary create-new float-right mt-3" style=" margin-bottom: 30px;">Create
                        New</button>
                </router-link>
            </div>
        </div>

    </div>
</template>
<script>
import { API_PRODUCT, API_IMPORT_PRODUCT } from '../common/contants'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Papa from 'papaparse';
export default {
    name: "ProductList",
    data() {
        return {
            products: [],
            parentBorder: false,
            searchKeyword: ''
        }
    },
    async mounted() {
        this.getAllProduct()
    },
    methods: {
        getAllProduct() {
            this.$request.get(API_PRODUCT).then((result) => {
                this.products = result.data
            }).catch((err) => {
                alert(err)
            });
        },
        onDelete(Productid) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$request.delete(API_PRODUCT + `/${Productid}`).then((result) => {
                        if (result.data.success) {
                            this.getAllProduct()
                            this.$swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    }).catch((err) => {
                        alert(err)
                    });

                }
            })
        },
        searchProduct() {
            this.$request.get(API_PRODUCT + `/search/${this.searchKeyword}`)
                .then((result) => {
                    this.products = result.data;
                })
                .catch((err) => {
                    alert(err);
                });
        },
        escapeDoubleQuotes(text) {
            return text.replace(/"/g, '""');
        },
        convertArrayOfObjectsToCSV(data) {
            const csvRows = [];

            // Header row
            const headers = ["Stt", "Id", "Image", "Name", "Price", "Description"];
            csvRows.push(headers.map(header => `"${this.escapeDoubleQuotes(header)}"`).join(","));

            // Data rows
            data.forEach((product, index) => {
                const row = [
                    index + 1,
                    `"${this.escapeDoubleQuotes(product.id)}"`,
                    `"${this.escapeDoubleQuotes(product.image)}"`,
                    `"${this.escapeDoubleQuotes(product.name)}"`,
                    `"${this.escapeDoubleQuotes(product.price)} VND"`,
                    `"${this.escapeDoubleQuotes(product.description)}"`
                ];
                csvRows.push(row.join(","));
            });

            return csvRows.join("\r\n");
        },
        // exportCSV() {
        //     // Original CSV string with column headers
        //     let csvContent = "data:text/csv;charset=utf-8,"
        //         + "Stt,Id,Image,Name,Price,Description\r\n";
        //     const currentDate = new Date();
        //     var dateTimeString = currentDate.toISOString().replace(/[-:.]/g, '');
        //     // Loop through each product and add the data to the CSV series
        //     this.products.forEach((product, index) => {

        //         let row = [
        //             index,
        //             product.id,
        //             product.image,
        //             this.escapeDoubleQuotes(product.name),
        //             product.price,
        //             this.escapeDoubleQuotes(product.description)
        //         ];
        //         csvContent += row.map(value => `"${value}"`).join(",") + "\r\n";
        //     });
        //     const filename = `AllProducts${dateTimeString}.csv`;
        //     // Generate a URL based on a CSV string
        //     let encodedUri = encodeURI(csvContent);

        //     // Create element a to download CSV file
        //     let link = document.createElement("a");
        //     link.setAttribute("href", encodedUri);
        //     link.setAttribute("download", filename);
        //     document.body.appendChild(link);

        //     // Automatically trigger click to download event
        //     link.click();
        // }
        exportCSV() {
            const currentDate = new Date();
            const dateTimeString = currentDate.toISOString().replace(/[-:.]/g, '');
            const filename = `products-${dateTimeString}.csv`;

            const csvData = this.convertArrayOfObjectsToCSV(this.products);
            const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
            const csvUrl = URL.createObjectURL(csvBlob);

            let link = document.createElement("a");
            link.setAttribute("href", csvUrl);
            link.setAttribute("download", filename);
            document.body.appendChild(link);

            link.click();
        },

        exportPDF() {
            // const doc = new jsPDF('landscape');
            // doc.addFont('../../../assets/font/ArialUnicodeMS.ttf', 'ArialUnicodeMS', 'normal');
            // doc.setFontSize(9);
            // // Header
            // const headers = ["Stt", "Id", "Image", "Name", "Price", "Description"];
            // const tableData = this.products.map((product, index) => [
            //     index + 1,
            //     product.id,
            //     product.image,
            //     product.name,
            //     product.price + " VND",
            //     product.description
            // ]);

            // const columnWidths = [5, 15, 30, 15, 20, 70];
            // doc.autoTable({
            //     head: [headers],
            //     body: tableData,
            //     startY: 15,
            //     startX: 2,
            //     columnWidths: columnWidths,

            // });
            // const currentDate = new Date();
            // const dateTimeString = currentDate.toISOString().replace(/[-:.]/g, '');
            // const filename = `products-${dateTimeString}.pdf`;

            // doc.save(filename);

            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            const columns = [
                { header: 'Stt', key: 'index', width: 30 },
                { header: 'Id', key: 'id', width: 50 },
                { header: 'Image', key: 'image', width: 70 },
                { header: 'Name', key: 'name', width: 100 },
                { header: 'Price', key: 'price', width: 60 },
                { header: 'Description', key: 'description', width: 170 }
            ];

            // Tạo một mảng chứa dữ liệu cho bảng
            const tableData = this.products.map((product, index) => ({
                index: index + 1,
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.price + ' VND',
                description: product.description
            }));

            // Tạo đối tượng định dạng bảng
            const tableLayout = {
                fillColor: function (rowIndex) {
                    return rowIndex % 2 === 0 ? '#CCCCCC' : null;
                }
            };

            // Tạo đối tượng PDF
            const docDefinition = {
                content: [
                    // Tiêu đề
                    { text: 'Product List', style: 'header' },
                    '\n',
                    // Bảng
                    {
                        table: {
                            headerRows: 1,
                            widths: columns.map(column => column.width),
                            body: [
                                columns.map(column => column.header),
                                ...tableData.map(item => columns.map(column => item[column.key]))
                            ],
                            layout: tableLayout
                        }
                    }
                ],
                styles: {
                    header: {
                        fontSize: 16,
                        bold: true
                    }
                }
            };
            const currentDate = new Date();
            const dateTimeString = currentDate.toISOString().replace(/[-:.]/g, '');
            const filename = `products-${dateTimeString}.pdf`;
            // Xuất file PDF
            pdfMake.createPdf(docDefinition).download(filename);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                Papa.parse(file, {
                    header: true,
                    complete: (results) => {
                        results.data.pop()
                        this.importProducts(results.data);
                    }
                });
            }
        },
        importProducts(data) {
            data.forEach(element => {
                this.$request.post(API_PRODUCT, element).then(
                    res => {
                        if (res.data.success) {
                            this.$router.push({
                                name: 'product.list'
                            })
                            return
                        }
                        alert('Something went wrong')
                    }
                )
            });
        },
    },
}
</script>



