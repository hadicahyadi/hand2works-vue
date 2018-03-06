<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-sm btn-primary pull-left" @click="openModal">Add Category</button>
        <span class="pull-right">{{categories.length}} Category(s) Found</span>
      </div>
    </div>
    <table class="table table-stripped table-hover mt-2">
      <thead>
        <th>Category Name</th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="category in categories">
          <td>{{category.name}}</td>
          <td>
            <a href="" @click="editItem(category, $event)" v-b-tooltip.hover title="Edit Item">
              <i class="icon-pencil"></i>
            </a>
          </td>
          <td>
            <a href="" @click="removeItem(category._id, $event)" class="mr-2 text-danger" v-b-tooltip.hover title="Delete Item">
              <i class="icon-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <modal name="categoryModal" height="auto" :pivotY="0.2">
      <div class="modal-content">
        <div class="modal-body">
          <b-form>
            <b-form-group label="Category Name"
                          label-for="categoryName">
              <b-form-input id="categoryName"
                            type="text"
                            v-model="category.name"
                            required>
              </b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <div class="modal-footer">
          <b-button type="button" variant="primary" @click="submit">Save</b-button>
          <b-button type="button" variant="light" @click="$modal.hide('categoryModal')">Cancel</b-button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import server from '../services/server'

  export default {
    name: 'Category',
    data () {
      return {
        category: {},
        categories: [],
        categoryName: ''
      }
    },
    methods: {
      openModal () {
        this.$modal.show('categoryModal')
      },
      submit (evt) {
        evt.preventDefault()
        if (this.category._id) { // _id is exist then update
          server.patch('/category', this.category).then((data) => {
            this.$modal.hide('categoryModal')
            this.loadData()
          })
        } else { // _id is not exist then add new
          server.post('/category', this.category).then((data) => {
            this.$modal.hide('categoryModal')
            this.loadData()
          })
        }
      },
      removeItem (id, evt) {
        evt.preventDefault()
        server.delete('/category', {id: id}).then(() => {
          this.loadData()
        })
      },
      editItem (category, evt) {
        evt.preventDefault()
        this.category = category
        this.openModal()
      },
      loadData () {
        server.get('/category').then((data) => {
          this.categories = data
        })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
