<template>
  <el-row type="flex" justify="center">
    <el-col :xs="10" :sm="10" :md="10" :lg="10">
      <div class="form_auth">
        <el-form label-position="right" ref="form" :model="form">
          <el-form-item label="Ваш почта" prop="email" :rules="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Ваш пароль" prop="password" :rules="password">
            <el-input v-model="form.password" type="password"></el-input>
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
    title: "Авторизация"
  },
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: ""
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
      ]
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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
