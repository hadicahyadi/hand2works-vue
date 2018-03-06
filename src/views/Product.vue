<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-sm btn-primary pull-left" @click="openModal">Add Product</button>
        <span class="pull-right">{{products.length}} Product(s) Found</span>
      </div>
    </div>
    <table class="table table-striped table-hover mt-2">
      <thead>
        <th>Name</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Stock</th>
      </thead>
      <tbody>
        <tr v-for="product in products">
          <td>{{product.name}}</td>
          <td>{{product.category.name}}</td>
          <td>{{product.brand.name}}</td>
          <td>{{formatPrice(product.price)}}</td>
          <td>{{product.stock}}</td>
        </tr>
      </tbody>
    </table>

    <modal name="productModal" height="auto" :pivotY="0.3">
      <div class="modal-content">
        <div class="modal-body">
          <b-form>
            <b-form-group label="Product Name"
                          label-for="productName">
              <b-form-input id="productName"
                            type="text"
                            v-model="product.name"
                            required>
              </b-form-input>
            </b-form-group>
            <b-form-group label="Brand"
                          label-for="brand">
              <b-form-select id="brand" v-model="product.brand" :options="brands" />
            </b-form-group>
            <b-form-group label="Category"
                          label-for="category">
              <b-form-select id="category" v-model="product.category" :options="categories" />
            </b-form-group>
            <b-form-group label="Price"
                          label-for="price">
              <b-form-input id="price"
                            type="number"
                            v-model="product.price"
                            required>
              </b-form-input>
            </b-form-group>
            <b-form-group label="Stock"
                          label-for="stock">
              <b-form-input id="stock"
                            type="number"
                            v-model="product.stock"
                            required>
              </b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <div class="modal-footer">
          <b-button type="button" variant="primary" @click="submit">Save</b-button>
          <b-button type="button" variant="light" @click="$modal.hide('productModal')">Cancel</b-button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import server from '@/services/server'

  export default {
    name: 'Product',
    data () {
      return {
        products: [],
        brands: [],
        categories: [],
        product: {}
      }
    },
    methods: {
      openModal () {
        this.loadBrands()
        this.loadCategories()
        this.$modal.show('productModal')
      },
      submit (evt) {
        evt.preventDefault()
        if (this.product._id) { // _id is exist then update

        } else { // _id is not exist then add new
          server.post('/product', this.product).then((data) => {
            console.log(data)
            this.$modal.hide('productModal')
            this.loadData()
          })
        }
      },
      formatPrice (value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      loadData () {
        server.get('/product').then((data) => {
          this.products = data
        })
      },
      loadBrands () {
        server.get('/brand').then((data) => {
          data.forEach((item) => this.brands.push({ text: item.name, value: item._id }))
          this.product.brand = this.brands[0].value
        })
      },
      loadCategories () {
        server.get('/category').then((data) => {
          data.forEach((item) => this.categories.push({ text: item.name, value: item._id }))
          this.product.category = this.categories[0].value
        })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
