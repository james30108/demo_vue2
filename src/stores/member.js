import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import * as firestore from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage"
import * as server from "../server"

export default defineStore('member', () => {

    const form = reactive({ name : null, image : null })
    const data = reactive([])

    // ตัวอย่าง computed
    const computed_message = computed(() => {
        return "ระบบพร้อมทำงาน"
    })

    // ตัวอย่าง method
    function form_submit () {
        form.id != null ? update () : save ()
    }
    async function save () {
        try {
            //const new_name = new File([form.image], 'new_name.jpg', {type: new_name.type})
            data.push ({ id : Math.random() ,name : form.name, image : form.image })
            const docRef = await firestore.addDoc(firestore.collection(server.db, "users"), form);
            console.log("Document written with ID: ", docRef.id);
            reset ()
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    function update () {
        const index = data.findIndex(element => element.id === form.id)
        data[index].name = form.name
        reset ()
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
        form.image= null
        document.getElementById("member_image").value = "";
        console.log ("reset")
    }
    function delete_one (id) {
        const index = data.findIndex(element => element.id === id)
        data.splice(index, 1)
        console.log (index)
    }
    function insert_image (image) {
        const file = image.target.files[0]
        form.image = URL.createObjectURL(file)
        console.log (file)
    }

    return { data, form, computed_message, form_submit, reset, delete_one, get_one, update, insert_image }
})