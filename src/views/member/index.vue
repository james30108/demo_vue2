<script setup>
    import { provide } from 'vue'
    import member from '@/stores/member'
    import Member_count from '../../components/member_count.vue'
    const member_data = member ()
    provide('message', member_data.data)
</script>

<template>
    <title>Member</title>
    
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-3">Member</h4>
        <div class="row">
            {{ JSON.stringify(member_data.form) }}
            <div class="col-12">
                <div class="card mb-3">
                    <div class="card-body">
                        <form id="formsubmit" @submit.prevent="member_data.form_submit">
                        <input 
                            type="hidden"
                            name="product_attribute_id"
                            v-model="member_data.form.id"
                        >
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="member_name" class="form-label">Member</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="member_name"
                                    placeholder="Member"
                                    name="member_name"
                                    v-model="member_data.form.name"
                                    autofocus
                                    required
                                />
                            </div>
                            <div class="col-12 mb-3">
                                <label for="member_image" class="form-label">Image</label>
                                <input
                                    class="form-control"
                                    type="file"
                                    id="member_image"
                                    placeholder="Member Image"
                                    name="member_image"
                                    ref="imgInput"
                                    @change="member_data.insert_image"
                                    
                                />
                            </div>
                        </div>
                        <hr>
                        <div class="mt-2">
                            <button type="submit" class="btn btn-primary me-2">บันทึก</button>
                            <button type="reset" class="btn btn-outline-secondary" @click="member_data.reset">ยกเลิก</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 ">
                <div class="card">
                <h5 class="card-header">รายการ</h5>
                <div class="card-body">
                    ข้อมูลในระบบ : {{ member_data.computed_message }}
                    <Member_count/>
                </div>
                <div class="table-responsive text-nowrap">
                    <table class="table mb-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>รูป</th>
                            <th>ชื่อ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        <tr v-for="(item, index) in member_data.data" v-if="member_data.data.length > 0">
                            <td>{{ index + 1 }}</td>
                            <td >
                                <img 
                                    v-if="item.image != '' "
                                    :src="item.image" 
                                    class="d-block rounded"
                                    height="100"
                                    width="100"
                                > 
                            </td>
                            <td><button class="bg-transparent border-0 text-primary" @click="member_data.get_one( item.id )">{{ item.name }}</button></td>
                            <td>
                                <button class="me-1 bg-transparent border-0" @click="member_data.delete_one( item.id )"><i class="bx bx-trash me-1 font-22 text-primary"></i></button> 
                            </td>
                        </tr>
                        <tr v-else="member_data.data.length > 0">
                            <td colspan="4">ไม่มีข้อมูลในระบบ</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>     
    </div>
</template>