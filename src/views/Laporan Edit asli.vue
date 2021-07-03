<template>
  <div style="justify-content:center; margin:50px auto; padding: 0 100px; background-color: white">
    <div class="text-center" style="margin: 50px auto; padding: 0 100px">
      <div class="align-items-center my-4">
        <div class="d-flex align-items-center justify-content-start">
          <!-- Foto Hewan Kurban Anda -->
        <!-- <div class="col-3"> -->
          <h2><b>Edit Laporan</b></h2> 
        <!-- </div> -->
          <div class="col">
            <input type="radio" class="btn-check" name="options-outlined" id="foto_hewan" value="foto_hewan" v-model="proses" autocomplete="off" checked>
            <label class="btn btn-danger font-weight-bold text-light px-4" for="foto_hewan">
              <span class="d-flex justify-content-center">Foto Hewan</span> 
              <span class="d-flex justify-content-center">Kurban Anda</span>
            </label>
          </div>
          <!-- Foto Proses Penyembelihan -->
          <div class="col">
            <input type="radio" class="btn-check" name="options-outlined" id="penyembelihan" value="penyembelihan" v-model="proses" autocomplete="off">
            <label class="btn btn-warning font-weight-bold text-light px-4" for="penyembelihan">
              <span class="d-flex justify-content-center">Foto Proses</span> 
              <span class="d-flex justify-content-center">Penyembelihan</span>
            </label>
          </div>
          <!-- Foto Pembagian Kurban -->
          <div class="col">
            <input type="radio" class="btn-check" name="options-outlined" id="pembagian" value="pembagian" v-model="proses" autocomplete="off">
            <label class="btn btn-warning font-weight-bold text-light px-4" for="pembagian">
              <span class="d-flex justify-content-center">Foto Pembagian</span> 
              <span class="d-flex justify-content-center">Kurban</span>
            </label>
          </div>
        </div>
        <div v-if="report" class="card my-4">
          <div class="d-flex justify-content-center my-5">
            <span v-if="report.proses == 'foto_hewan'">
              <h4><b>Foto Hewan Kurban</b></h4>
            </span>
            <span v-if="report.proses == 'penyembelihan'">
              <h4><b>Foto Proses Penyembelihan Kurban</b></h4>
            </span>
            <span v-if="report.proses == 'pembagian'">
              <h4><b>Foto Pembagian Kurban</b></h4>
            </span>
          </div>
          <div class="align-items-center mx-auto" style="width: 750px">
            <div class="col">
              <form>
                <b-form-group>
                  <b-form-input v-if="report.proses == 'foto_hewan'" id="nama" v-model="report.nama" placeholder="Atas Nama" trim required></b-form-input>
                  <b-form-input v-if="report.proses == 'penyembelihan'" id="penyembelih" v-model="report.penyembelih" placeholder="Penyembelih" trim required></b-form-input>
                  <b-form-input v-if="report.proses == 'pembagian'" id="lokasi_pembagian" v-model="report.lokasi_pembagian" placeholder="Lokasi Pembagian" trim required></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-form-input v-if="report.proses == 'foto_hewan'" id="jenis" v-model="report.jenis" placeholder="Jenis Hewan" trim required></b-form-input>
                  <b-form-datepicker v-if="report.proses == 'penyembelihan'" id="hari_penyembelihan" v-model="report.hari_penyembelihan" placeholder="Hari" trim required></b-form-datepicker>
                  <b-form-input v-if="report.proses == 'pembagian'" id="penanggung_jawab" v-model="report.penanggung_jawab" placeholder="Penanggung Jawab" trim required></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-form-input v-if="report.proses == 'foto_hewan'" id="berat" v-model="report.berat" placeholder="Berat" trim required></b-form-input>
                  <b-form-input v-if="report.proses == 'penyembelihan'" id="pukul_penyembelihan" v-model="report.pukul_penyembelihan" placeholder="Pukul" trim required></b-form-input>
                  <b-form-datepicker v-if="report.proses == 'pembagian'" id="hari_pembagian" v-model="report.hari_pembagian" placeholder="Hari" trim required></b-form-datepicker>
                </b-form-group>
              </form>
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" useCustomSlot data-toggle="tooltip" title="halo" @vdropzone-complete="afterComplete">
                    <div class="dropzone-custom-content" >
                        <img src="../../public/img/entypo_upload-to-cloud.svg" alt="Cloud Upload Icon" height="75px">
                        <div class="subtitle">
                          <span v-if="report.proses == 'foto_hewan'">Upload Foto Hewan</span>
                          <span v-if="report.proses == 'penyembelihan'">Upload Foto Penyembelihan</span>
                          <span v-if="report.proses == 'pembagian'">Upload Foto Pembagian Kurban</span>
                        </div>
                    </div>
                </vue-dropzone>
            </div>
          </div>
          <div class="d-flex justify-content-between my-5" style="margin: auto 150px">
            <router-link to="reportDetail">
              <button class="btn btn-outline-danger">Kembali</button>
            </router-link>
            <!-- <router-link to="reportDetail">
              <button class="btn btn-danger ">Simpan</button>
            </router-link> -->
              <button @click="editReport" class="btn btn-danger ">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      report: '',
      formData: {},
      pembayaranData: '',
      proses: '',
      nama: '',
      jenis: '',
      berat: '',
      penyembelih: '',
      hari_penyembelihan: '',
      pukul_penyembelihan: '',
      lokasi_pembagian: '',
      penanggung_jawab: '',
      hari_pembagian: '',
      foto: '',
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      }
    };
  },
  methods: {
    afterComplete(file) {
        this.foto = file.upload.filename
        // console.log(file);
    },
    getReportDetail() {
      this.axios.get(`report/${this.$route.params.id_laporan}`).then(response => {
        this.report = response.data
      }).catch(error => {
        console.log(error.response);
      })
    },
    // getpembayaranData() {
    //   const id_pembayaran = this.$route.params.id_pembayaran
    //   this.axios.get(`pembayaran/${id_pembayaran}`).then(response => {
    //     this.pembayaranData = response.data
    //     this.nama = this.pembayaranData.nama
    //     this.jenis = `${this.pembayaranData.package.nama} ${this.pembayaranData.package.variant}`
    //     this.berat = this.pembayaranData.package.berat
    //   }).catch(error => {
    //     console.log(error);
    //   })
    // },
    editReport() {
      // const formData = new FormData();
      // if (this.report.proses == 'foto_hewan') {
      //   formData.append('nama', this.report.nama)
      //   formData.append('jenis_hewan', this.report.jenis)
      //   formData.append('berat_hewan', this.report.berat)
      // } else if (this.report.proses == 'penyembelihan') {
      //   formData.append('penyembelih', this.report.penyembelih)
      //   formData.append('hari_penyembelihan', this.report.hari_penyembelihan)
      //   formData.append('pukul_penyembelihan', this.report.pukul_penyembelihan)
      // } else {
      //   formData.append('lokasi_pembagian', this.report.lokasi_pembagian)
      //   formData.append('penanggung_jawab', this.report.penanggung_jawab)
      //   formData.append('hari_pembagian', this.report.hari_pembagian)
      // }
      // formData.append('foto', this.foto)

      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      var formData;

      if (this.report.proses == 'foto_hewan') {
        formData = {
          nama: this.report.nama,
          jenis_hewan: this.report.jenis_hewan,
          berat_hewan: this.report.berat_hewan,
          foto: this.foto,
        }
      } else if (this.report.proses == 'penyembelihan') {
        formData = {
          penyembelih: this.report.penyembelih,
          hari_penyembelihan: this.report.hari_penyembelihan,
          pukul_penyembelihan: this.report.pukul_penyembelihan,
          foto: this.foto,
        }
      } else {
        formData = {
          lokasi_pembagian: this.report.lokasi_pembagian,
          penanggung_jawab: this.report.penanggung_jawab,
          hari_pembagian: this.report.hari_pembagian,
          foto: this.foto,
        }
      }

      // console.log(formData);
      // return false

      this.axios.put(`report/${this.$route.params.id_laporan}`, formData).then(response => {
        console.log(response.data);
        this.$router.push({name: 'reportDetail', params: {id_pembayaran: this.report.id_pembayaran}})
      }).catch(error => {
        console.log(error.response);
      })
    }
  },
  mounted() {
    this.getReportDetail()
    // this.getpembayaranData()
  }
};
</script>

<style scoped>
.btn-check{
  display:none
}
</style>