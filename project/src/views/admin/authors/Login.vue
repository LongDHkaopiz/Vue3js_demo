<template>
	<div class="container h-100" >
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="../../../assets/img/pxfuel.jpg" class="brand_logo" alt="Logo">
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form @submit.prevent="checkLogin()">
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input type="email" name="email" v-model="user.email" class="form-control input_user" placeholder="Enter your email">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" minlength="8" v-model="user.password" class="form-control input_pass" placeholder="Enter your password">
						</div>
						<div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline">
								<label class="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div>
						<div class="d-flex justify-content-center mt-3 login_container">
							<button type="submit" class="btn login_btn">Login</button>
						</div>
					</form>
			
				</div>
				<div class="mt-4">
					<div class="d-flex justify-content-center links">
						Don't have an account? <router-link to="/sign-up" class="ml-2">Sign Up</router-link>
					</div>
					<div class="d-flex justify-content-center links">
						<router-link to="/forgot-password">Forgot your password?</router-link>
					</div>
				</div>
				<!-- <div class="g-recaptcha" data-sitekey="recaptchaSiteKey" data-callback="vueRecaptchaApiLoaded"></div> -->
				<vue-recaptcha ref="recaptcha" sitekey="recaptchaSiteKey" @verify="handleRecaptchaVerify"></vue-recaptcha>
			</div>
		</div>
	</div>
</template>
<script>
import { API_USER, API_LOGIN } from '../common/contants'
import { mapActions } from 'vuex'
import { VueRecaptcha } from 'vue-recaptcha-v3'
export default {
	name: "SignForm",
	components: { VueRecaptcha },
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            errors: {
                email: "",
                password: "",
			},
			recaptchaSiteKey: '6LexlFgmAAAAAKv1sV8CZ7081YVUFc9iDDZAXflj',
			recaptchaResponse: '',
			
        }
    },
	methods: {
		...mapActions(['login']),
        checkLogin() {
            this.$swal.fire({
                title: 'Good job!',
                text: "You login successfully!",
                icon: 'success'
            }).then((result) => {
				if (result.isConfirmed) {
					// Verify the reCAPTCHA token before submitting the form
					if (this.recaptchaResponse === null) {
						console.error('reCAPTCHA v3 token is missing!');
						return;
					}
                    this.$request.post(API_LOGIN, this.user).then(
                        res => {
							if (res.data.success) {
								if (res.data.user.role === 'admin') {
									this.$router.push({
										name: 'admin.dashboard',
									})
								} else {
									this.$router.push({
										name: 'home'
									})
								}
								this.$store.commit('login', this.user.email)
                                return
                            } else {
                                this.$swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                })
                            }
                        }
                    )
                }
            })
		},
		// vueRecaptchaApiLoaded() {
		// 	grecaptcha.ready(() => {
		// 		grecaptcha.execute(recaptchaSiteKey, { action: "submit" }).then((token) => {
		// 			this.recaptchaResponse = token;
		// 		});
		// 	});
		// },
		handleRecaptchaVerify() {
			grecaptcha.ready(() => {
				grecaptcha.execute(this.recaptchaSiteKey).then((response) => {
					this.recaptchaResponse = response;
				});
			});
			// this.recaptchaResponse =response
		},
	},
   
}
</script>