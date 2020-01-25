<template>
  <el-row type="flex" justify="center">
    <el-col :xs="10" :sm="10" :md="10" :lg="10">
      <div class="form_auth">
        <el-form label-position="right" ref="form" :model="form">
          <el-form-item label="Ваш почта" prop="email" :rules="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Ваш пароль" prop="password" :rules="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Ссылка на профиль инстаграма"
            prop="link"
            :rules="link"
          >
            <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-button type="primary" round :loading="loading" @click="login"
            >Войти</el-button
          >
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  head: {
    title: "Регистрация"
  },
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: "",
        link: ""
      },
      email: [
        {
          required: true,
          message: "Електроный адресс не должен быть пустым!",
          trigger: "blur"
        },
        {
          type: "email",
          message: "Введите коректно електроную почту!",
          trigger: ["blur", "change"]
        }
      ],
      password: [
        {
          required: true,
          message: "Пароль не должен быль пустым!",
          trigger: "blur"
        }
      ],
      link: [
        {
          required: true,
          message: "Ссылка должна быть не пустой",
          trigger: "blur"
        }
      ]
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          this.loading = true;
          const data = {
            email: this.form.email,
            password: this.form.password,
            link_instagram: this.form.link
          };
          try {
            await this.$store.dispatch("reg", data);
            let name = this.$store.getters.error;
            console.log(name);
          } catch (e) {
            this.$message.error(e);
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form_auth {
  background: #fff;
  padding: 20px 30px;
}
body {
  background: #f2f2f2;
}
</style>
