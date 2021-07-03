<template>
  <footer class="footer">
    <div class="container">
      <div class="copyright">
        &copy; {{ year }} - Powered by
        Inqilabi Farm
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
