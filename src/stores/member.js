import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('member', () => {

    const form = reactive({ id : null, name : null })
    const data = reactive([])

    // ตัวอย่าง computed
    const computed_message = computed(() => {
        return "ระบบพร้อมทำงาน"
    })

    // ตัวอย่าง method
    function form_submit () {
        form.id != null ? update () : save ()
    }
    function save () {
        data.push ({ id : Math.random() ,name : form.name })
        form.id   = null
        form.name = null
        console.log (data)
    }
    function update () {
        const index = data.findIndex(element => element.id === form.id)
        data[index].name = form.name
        form.id   = null
        form.name = null
        console.log ("Update")
    }
    function get_one (id) {
        const get_data = data.find(element => element.id === id)
        form.id   = get_data.id
        form.name = get_data.name
        console.log (get_data)
    }
    function reset () {
        form.id   = null
        form.name = null
        console.log ("reset")
    }
    function delete_one (id) {
        const index = data.findIndex(element => element.id === id)
        data.splice(index, 1)
        console.log (index)
    }

    return { data, form, computed_message, form_submit, reset, delete_one, get_one, update }
})