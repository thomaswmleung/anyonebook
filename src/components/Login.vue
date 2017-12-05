<template>
    <v-container grid-list-md >
        <v-layout row wrap>
            <v-flex xs12 md2>
                <h2>Login </h2>
            </v-flex>
            <v-flex xs12 md10>
                <v-layout row wrap>
                    <v-flex xs12 md10>
                        <ul>
                            <li v-for="item in items" :key="item" >{{item}}</li> 
                        </ul>

                        <ul>
                            <li v-for="item in completed" :key="item" :style="{background:'lightgreen'}" >{{item}}</li> 
                        </ul>

                    </v-flex>
                    <v-flex xs12 md2>
                        Try
                    </v-flex>
                </v-layout>                
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex md12 >
                <v-card md6>
                    <v-card-title primary-title>
                        <h5 class="headline">{{$t('AnyOneBook Login')}}</h5>
                    </v-card-title>
                    <v-card-text>
                        
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-text-field
                                :label="$t('User Email')"
                                :rules="emailRules"
                                v-model="email"
                                required
                                ></v-text-field>
                                <v-text-field
                                :label="$t('Password')"
                                :rules="passwordRules"
                                :append-icon="password_v ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (password_v = !password_v)"
                                :type="password_v ? 'password' : 'text'"                                
                                v-model="password"
                                required
                                ></v-text-field>
                                <v-btn @click.stop="clear">{{$t("Cancel")}}</v-btn>
                                <v-btn color="primary" @click.stop="submit">{{$t("Submit")}}</v-btn>
                            </v-form >
                    </v-card-text>
                        
                </v-card>
            </v-flex>
        </v-layout>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
</style>

<script>
 export default {
  name: 'Pagination',
  methods:{
      clear(){
          this.$refs.form.reset()
      },
      submit(){
          //Calling http
          //Trigger action
      }
  },
  data() {
    return {
        email:"",
        password:"",
        user_id:"",
        passwordRules: [
            (v) => !!v || this.$t('Password is required'),
            (v) => v && v.length >= 8 || this.$t('Password must be more than 8 characters')
        ],
        password_v:true,
       emailRules: [
            (v) => !!v || this.$t('E-mail is required'),
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('E-mail must be valid')
       ], 
        items:[
            "Login,Integrate with backend service",
            "Error Handling,using snackbar in vuetify",
            "Redirect, to previous url", 
            "Logout, remove user_id and user profile detail"
        ],
        completed:[
        ]
    };
  },
};    
</script>
<style scoped>

</style>
