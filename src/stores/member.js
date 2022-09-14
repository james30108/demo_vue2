import { ref, computed, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import * as firestore from "firebase/firestore"
import * as storage from "firebase/storage"
import * as server from "../server"

export default defineStore('member', () => {

    const form = reactive({ name : null, image : null })
    const data = reactive([])

    // ตัวอย่าง computed
    const computed_message = computed(() => {
        return "ระบบพร้อมทำงาน"
    })

    // ตัวอย่าง method
    async function get_all () {

        data.length = 0
        const querySnapshot = await firestore.getDocs(firestore.collection(server.db, "users"))
        querySnapshot.forEach((doc) => {
                
            // Download Image
            const storageRef    = storage.ref(server.storage, "member/" + doc.data().image)
            const dowload_image = storage.getDownloadURL(storageRef)
            .then((url) => {
                data.push ({ id : doc.id ,name : doc.data().name, image : url })
            })
            
        })
        console.log ("get all !")
    }
    function form_submit () {
        form.id ? update () : save ()
    }
    async function save () {
        try {

            // Upload Image
            const new_name   = Date.now() + "_" + Math.floor(Math.random() * 1001)
            const storageRef = storage.ref(server.storage, "member/" + new_name)
            storage.uploadBytes(storageRef, form.image).then((snapshot) => {
                console.log('Uploaded a blob or file!')
                console.log(snapshot)
            })

            // Save Data
            // data.push ({ id : Math.random() ,name : form.name, image : new_name })
            form.image = new_name
            const docRef = await firestore.addDoc(firestore.collection(server.db, "users"), form);
            console.log("Document written with ID: ", docRef.id);
            reset ()
            get_all ()

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

        delete form.id
        form.name = null
        form.image= null
        document.getElementById("member_image").value = "";
        console.log ("reset")
        
    }
    async function delete_one (id) {
        // const index = data.findIndex(element => element.id === id)
        // data.splice(index, 1)
        //console.log (index)
        await firestore.deleteDoc(firestore.doc(server.db, "users", id))
        console.log ("deleted !")
        get_all ()
    }
    function insert_image (image) {
        const file = image.target.files[0]
        //form.image = URL.createObjectURL(file)
        form.image = file
        console.log (file.name)
        console.log (form.image)
    }
    onMounted(() => {
        get_all ()
    })

    return { data, form, computed_message, form_submit, reset, delete_one, get_one, update, insert_image }
})