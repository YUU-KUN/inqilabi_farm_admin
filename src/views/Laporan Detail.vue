<template>
  <div style="justify-content:center; margin:50px auto; padding: 0 100px; background-color: white">
      <div class="d-flex justify-content-between">
        <h2><b>Detail Proses Laporan</b></h2>
            <button @click="redirectPengiriman" v-if="pembayaran.proses == 'dikirim'" class="btn btn-warning font-weight-bold text-white">Data Pengiriman</button>
      </div>
          <button v-if="reports.length > 0 && reports.length < 3" @click="addReport" class="btn btn-success mt-5 font-weight-bold">+ Tambah Laporan</button>
      <div class="text-center" >
        <div class="align-items-center my-4">
            <div v-if="reports.length > 0">
                <div class="card mb-4" v-for="(report,index) in reports" :key="report.id">
                    <div class="table-responsive">
                        <div class="text-center px-3" style="margin: 50px auto;">
                            <div class="row">
                                <div class="col">
                                    <h5>Proses</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'">Atas Nama</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'">Penyembelih</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'">Lokasi Pembagian</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'">Nama Supir</h5>
                                    <h5 v-else>Nama Penerima</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'">Jenis Hewan</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'">Hari</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'">Penanggung Jawab</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'">No. Handphone</h5>
                                    <h5 v-else>Diterima Hari</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'">Berat</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'">Pukul</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'">Hari</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'">Mobil Pengirim</h5>
                                    <h5 v-else>Diterima Pukul</h5>
                                </div>
                                <div class="col">
                                    <h5>Foto</h5>
                                </div>
                                <div class="col">
                                    <h5>Aksi</h5>
                                </div>
                            </div>
                            <br>
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'" class="font-weight-normal">Foto Hewan Kurban</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'" class="font-weight-normal">Foto Penyembelihan Hewan Kurban</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'" class="font-weight-normal">Foto Pembagian Hewan Kurban</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'" class="font-weight-normal">Foto Pengiriman Hewan Kurban</h5>
                                    <h5 v-else class="font-weight-normal">Foto Kurban sampai di Lokasi</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'" class="font-weight-normal">{{report.nama}}</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'" class="font-weight-normal">{{report.penyembelih}}</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'" class="font-weight-normal">{{report.lokasi_pembagian}}</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'" class="font-weight-normal">{{report.supir}}</h5>
                                    <h5 v-else class="font-weight-normal">{{report.penerima}}</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'" class="font-weight-normal">{{report.jenis_hewan}}</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'" class="font-weight-normal">{{report.hari_penyembelihan | formatDate}}</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'" class="font-weight-normal">{{report.penanggung_jawab}}</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'" class="font-weight-normal">{{report.no_supir}}</h5>
                                    <h5 v-else class="font-weight-normal">{{report.hari_diterima | formatDate}}</h5>
                                </div>
                                <div class="col">
                                    <h5 v-if="report.proses == 'foto_hewan'" class="font-weight-normal">{{report.berat_hewan}} Kg</h5>
                                    <h5 v-else-if="report.proses == 'penyembelihan'" class="font-weight-normal">{{report.pukul_penyembelihan}}</h5>
                                    <h5 v-else-if="report.proses == 'pembagian'" class="font-weight-normal">{{report.hari_pembagian | formatDate}}</h5>
                                    <h5 v-else-if="report.proses == 'pengiriman'" class="font-weight-normal">{{report.mobil_pengirim}}</h5>
                                    <h5 v-else class="font-weight-normal">{{report.pukul_diterima}}</h5>
                                </div>
                                <div class="col">
                                    <!-- <a :href="reportPath + report.foto" target="_blank" rel="noopener">Tess</a> -->
                                    <a data-fancybox :href="reportPath + report.foto">
                                        <img :src="reportPath + report.foto" alt="report image" class="img-thumbnail">
                                    </a>
                                </div>
                                <div class="col">
                                    <!-- <span v-if="report.isReported == 1">
                                        <button class="btn btn-success text-light font-weight-bold mx-1">Terlaporkan</button>
                                    </span> -->
                                    <!-- <span v-else> -->
                                        <button @click="editReport(report.id)" class="btn btn-danger text-light font-weight-bold mx-1">Edit</button>
                                        <button v-if="report.isReported == 0" @click="sendReport(index)" class="btn btn-success text-light font-weight-bold mx-1">Laporkan</button>
                                        <button v-else disabled class="btn btn-outline-success font-weight-bold mx-1">Terlaporkan</button>
                                    <!-- </span> -->
                                </div>
                            </div>
                        </div>
                        <!-- <b-table
                            borderless
                            id="my-table"
                            :items="reports"
                            :per-page="perPage"
                            :current-page="currentPage"
                            :fields="fields"
                        > 

                            <template #head(proses)="data">
                                <h4>{{ data.label}}</h4>
                            </template>
                            <template #head(atas_nama)="data">
                                <h4>{{ data.label}}</h4>
                            </template>
                            <template #head(jenis_hewan)="data">
                                <h4>{{ data.label}}</h4>
                            </template>
                            <template #head(berat_hewan)="data">
                                <h4>{{ data.label}}</h4>
                            </template>
                            <template #head(foto)="data">
                                <h4>{{ data.label}}</h4>
                            </template>
                            <template #head(aksi)="data">
                                <h4>{{ data.label}}</h4>
                            </template>

                            <template v-slot:cell(proses)="data">
                                <h5 v-if="data.item.proses == 'foto_hewan'" class="font-weight-normal">Foto Hewan Kurban</h5>
                                <h5 v-else-if="data.item.proses == 'penyembelihan'" class="font-weight-normal">Foto Penyembelihan Hewan Kurban</h5>
                                <h5 v-else class="font-weight-normal">Foto Pembagian Kurban</h5>
                            </template>
                            <template #cell(atas_nama)="data">
                                <h5 class="font-weight-normal">{{ data.item.nama}}</h5>
                            </template>
                            <template #cell(jenis_hewan)="data">
                                <h5 class="font-weight-normal">{{ data.item.jenis_hewan}}</h5>
                            </template>
                            <template #cell(berat_hewan)="data">
                                <h5 class="font-weight-normal">{{ data.item.berat_hewan}}</h5>
                            </template>
                            <template #cell(foto)="data">
                                <img src="../../public/img/patungan_sapi.svg" alt="Foto Hewan Kurban" width="100px">
                                <h5 class="font-weight-normal">{{data.item.foto}}</h5>
                            </template>
                            <template #cell(aksi)="data">
                                    <button @click="editReport(data.item.id)" class="btn btn-danger text-light font-weight-bold mx-1">Edit</button>
                                    <button @click="sendReport(data.item.id)" class="btn btn-success text-light font-weight-bold mx-1">Laporkan</button>
                            </template>
                        </b-table> -->
                    </div>
                    
                </div>
            </div>
            <div v-else>
                <h5>Data Laporan Tidak Ditemukan</h5>
                <br>
                <button @click="addReport" class="btn btn-success">Tambah Laporan</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
        pembayaran: '',
        user_phone: '',
        reportPath: 'http://127.0.0.1:8000/reports/',
        foto_hewan: true,
        penyembelihan_hewan: true,
        pembagian_hewan: true,
        reports: [],
        col: [],
        val: [],
        // fields: [
        //     {key: 'proses', label: 'Proses'},
        //     {key: 'atas_nama', label: 'Atas Nama'},
        //     {key: 'jenis_hewan', label: 'Jenis Hewan'},
        //     {key: 'berat_hewan', label: 'Berat'},
        //     {key: 'foto', label: 'Foto'},
        //     {key: 'aksi', label: 'Aksi'},
        // ],
    };
  },
  methods: {
      getpembayaranData() {
          this.axios.get(`pembayaran/${this.$route.params.id_pembayaran}`).then(response => {
              this.pembayaran = response.data
          }).catch(error => {
              console.log(error.response);
          })
      },
      getReportDetail() {
          const id_pembayaran = this.$route.params.id_pembayaran
          this.axios.get(`getReportDetail/${id_pembayaran}`).then(response => {
              this.reports = response.data
          }).catch(error => {
              console.log(error.response);
          })
      },
      addReport() {
          const id_pembayaran = this.$route.params.id_pembayaran
          this.$router.push({name: 'reportCreate', params: {id_pembayaran} })
      },
      editReport(id) {
          this.$router.push({name: 'reportEdit', params: {id_laporan: id, id_pembayaran: this.$route.params.id_pembayaran}})
        //   const formData = new formData();
        //   this.axios.put(`report/${id}`, formData).then(response => {
        //       console.log(response.data);
        //   }).catch(error => {
        //       console.log(error.response);
        //   })
      },
      sendReport(index) {
          const report = this.reports[index]
          this.pembayaran ? this.user_phone = this.pembayaran.user.phone : ''
        //   if (this.pembayaran) {
        //       this.user_phone = this.pembayaran.user.phone
        //   }
          if (report.proses == 'foto_hewan') {
            this.col = ['Atas Nama', 'Jenis Hewan', 'Berat']
            this.val = [report.nama, report.jenis_hewan, report.berat_hewan + ' Kg']
          } else if (report.proses == 'penyembelihan') {
            this.col = ['Penyembelih', 'Hari', 'Pukul']
            this.val = [report.penyembelih, this.getDay(report.hari_penyembelihan), report.pukul_penyembelihan]
          } else if (report.proses == 'pembagian') {
            this.col = ['Lokasi Pembagian', 'Penanggung Jawab', 'Hari']
            this.val = [report.lokasi_pembagian, report.penanggung_jawab, this.getDay(report.hari_pembagian)]
          } else if (report.proses == 'pengiriman') {
            this.col = ['Nama Supir', 'No. Handphone', 'Mobil Pengirim']
            this.val = [report.supir, report.no_supir, report.mobil_pengirim]
          } else {
            this.col = ['Nama Penerima', 'Diterima Hari', 'Diterima Pukul']
            this.val = [report.penerima, this.getDay(report.hari_diterima), report.pukul_diterima]
          }
          const form = {
            //   url_file: 'https://blogpictures.99.co/film-anime-terbaik.png',
            //   url_file: this.reportPath + this.reports[index].foto, 
            //   url_file: 'http://localhost:8000/reports/1625230771.png', 
            //   phone: '085790909646',
            //   phone: '082244627112',
              phone: this.user_phone,
              message: 
                `Assalamualaikum Wr. Wb, \nKami dari pihak *Inqilabi Farm* hendak menyampaikan Laporan kurban dari kurban anda saat ini :
                \n${this.col[0]} : *${this.val[0]}* \n${this.col[1]} : *${this.val[1]}* \n${this.col[2]} : *${this.val[2]}*
                \nTerlampir foto hewan kurban pilihan anda. \nDemikian Laporan yang dapat kami sampaikan dan kami akan terus memberikan update terbaru tentang proses kurban anda yang diamanahkan kepada *Inqilabifarm.com*. \nJazaakumullah Khairan Katsiron. 
                \nWassalamualaikum Wr. Wb
                \nSalam Hangat, 
                \n*Admin Inqilabi Farm*`,
          }
          this.axios.post('uploadSertifikat', form).then(response => {
              console.log(response.data);
              this.changeReportStatus(report.id)
          }).catch(error => {
              console.log(error.response);
          })
        
      },
      changeReportStatus(id) {
          const isReported = '1'
          //   this.axios.put(`sendReport/${id}`).then(response => {
          this.axios.put(`report/${id}`, {isReported}).then(response => {
              console.log(response.data);
              this.getReportDetail()
          }).catch(error => {
              console.log(error.response);
          })
      },
      redirectPengiriman() {
          this.$router.push({name: 'Pengiriman', params: {id_pembayaran: this.$route.params.id_pembayaran}})
      },
      getDay(date) {
          return moment(date).locale('id').format('dddd, LL')
      }
  },
//   computed: {
    //   rows(){ 
    //       return this.reports.length
    //   },
//   },
  mounted() {
      this.getpembayaranData()
      this.getReportDetail()
  }
};
</script>

