<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-sm btn-primary pull-left" @click="openModal">Add Brand</button>
        <span class="pull-right">{{brands.length}} Brand(s) Found</span>
      </div>
    </div>
    <table class="table table-stripped table-hover mt-2">
      <thead>
        <th>Brand Name</th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="brand in brands">
          <td>{{brand.name}}</td>
          <td>
            <a href="" @click="editItem(brand, $event)" v-b-tooltip.hover title="Edit Item">
              <i class="icon-pencil"></i>
            </a>
          </td>
          <td>
            <a href="" @click="removeItem(brand._id, $event)" class="mr-2 text-danger" v-b-tooltip.hover title="Delete Item">
              <i class="icon-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <modal name="brandModal" height="auto" :pivotY="0.2">
      <div class="modal-content">
        <div class="modal-body">
          <b-form>
            <b-form-group label="Brand Name"
                          label-for="brandName">
              <b-form-input id="brandName"
                            type="text"
                            v-model="brand.name"
                            required>
              </b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <div class="modal-footer">
          <b-button type="button" variant="primary" @click="submit">Save</b-button>
          <b-button type="button" variant="light" @click="$modal.hide('brandModal')">Cancel</b-button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import server from '../services/server'

  export default {
    name: 'Brand',
    data () {
      return {
        brand: {},
        brands: [],
        brandName: ''
      }
    },
    methods: {
      openModal () {
        this.$modal.show('brandModal')
      },
      submit (evt) {
        evt.preventDefault()
        if (this.brand._id) { // _id is exist then update
          server.patch('/brand', this.brand).then((data) => {
            this.$modal.hide('brandModal')
            this.loadData()
          })
        } else { // _id is not exist then add new
          server.post('/brand', this.brand).then((data) => {
            this.$modal.hide('brandModal')
            this.loadData()
          })
        }
      },
      removeItem (id, evt) {
        evt.preventDefault()
        server.delete('/brand', {id: id}).then(() => {
          this.loadData()
        })
      },
      editItem (brand, evt) {
        evt.preventDefault()
        this.brand = brand
        this.openModal()
      },
      loadData () {
        server.get('/brand').then((data) => {
          this.brands = data
        })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
