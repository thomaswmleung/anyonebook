<template>
    <v-container grid-list-md >
        <v-layout row wrap>
          <v-flex xs12>
            <h2>{{$t("UserProfile")}}</h2>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
             <v-tabs :scrollable="false">
                <v-tabs-bar dark color="cyan">
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tabs-item
                    v-for="item in steps"
                    :key="item.key"
                    :href="`#tab-${item.key}`"
                  >
                    {{ $t(item.title) }}
                  </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-items>
                  <v-tabs-content
                    id="tab-step1"
                  >
                    <v-container>
                      <v-layout row wrap>
                        <v-flex md3>
                            <v-text-field
                            :label="$t('Email')"
                            v-model="metadata.email"
                            @input="formChangeHandler({attribute:'email',parameter:$event})"
                            required></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                            :label="$t('First Name')"
                            v-model="metadata.firstname"
                            @input="formChangeHandler({attribute:'firstname',parameter:$event})"
                            required></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                            :label="$t('Last Name')"
                            v-model="metadata.lastname"
                            @input="formChangeHandler({attribute:'lastname',parameter:$event})"
                            required></v-text-field>
                        </v-flex>
                        <v-flex md3>
                           {{$t('Gender')}}
                           <v-radio-group
                              style="margin-top:-1.3em"
                              v-model="metadata.gender"
                              row
                              @change="formChangeHandler({attribute:'gender',parameter:$event})"
                           >
                             <v-radio :label="$t('Male')" value="M"></v-radio>
                             <v-radio :label="$t('Female')" value="F"></v-radio>
                           </v-radio-group>
                        </v-flex>
                        <v-flex md6>
                            <v-text-field
                            v-model="metadata.address"
                            :label="$t('Address')"
                            @input="formChangeHandler({attribute:'address',parameter:$event})"
                            required></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                            :label="$t('Contact Phone')"
                            @input="formChangeHandler({attribute:'contact',parameter:$event})"
                            required></v-text-field>
                        </v-flex>
                        <v-flex md6>
                            <v-select
                              :items="schools"
                              item-text="name"
                              item-value="id"
                              label="Schools"
                               @change="formChangeHandler({attribute:'schools',parameter:$event})"
                              autocomplete
                              multiple
                            ></v-select>
                        </v-flex>
                        <v-flex md8 >
                          <common-items-manipulation
                            :items="family"
                            :attributes="['name','email','remark']"
                            :options="{remark:'textarea'}"
                            @change="emailHandler('family',$event)"
                           ></common-items-manipulation>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-tabs-content>
                </v-tabs-items>
              </v-tabs>
          </v-flex>
        </v-layout>
     </v-container>
</template>
<style scoped>
    li.complete {
        background: #DDD;
    }
    .flex-content{
        display:flex;
    }
    .active {
      background-color:lightgoldenrodyellow
    }
</style>

<script>
import {mapGetters,mapActions} from "vuex"
import { Http,ApiPrivateHttp } from '@/shared/http-service'
import { toQueryParams } from '@/shared/helpers'
import { REGISTER, DEBUG,API_BASE_URL } from '@/env'

import CommonItemsManipulation from "@/components/partial/common-items-manipulation"

 export default {
  name: 'UserProfile',
  components:{CommonItemsManipulation},
  methods:{
    ...mapActions([
      "actUpdateUserMetaData",
    ]),
    emailHandler(attr,parameter){
      console.log(parameter);
      this[attr] = parameter;
    },
    stepClickHandler(key){
      this.current_step = key;
    },
    formChangeHandler({attribute,parameter}){
      this.actUpdateUserMetaData({attribute,parameter});
    },
    fetchData(){
        let school_type = "primary";
        return new Promise((resolve,reject)=>{
          Http({
              method: 'get',
              url: `static/${school_type}.tsv`,
            }).then(
                response=>{
                  let items=[];
                  let fields = ["id","type","name","chi_address","eng_address"];
                  let rowArray = response.split('\n');
                  rowArray.forEach(row=>{
                      let obj = {};
                      let arr = []
                      let attrs = row.split('\t');
                      fields.forEach((str,idx)=>{
                          obj[str] = attrs[idx];
                          if(str == "name"){
                            arr = obj.name.split("   ")
                            //0:Chinese Name, 1: English Name, 2:Website
                            obj.name = `${arr[0]}  -   ${arr[1]}`
                          }
                      })
                      items.push(obj);
                  });
                  resolve(items);
                }
            );
        });
    }
  },
  data() {
    return {
        current_step:"step1",
        steps:[{key:"step1",title:"Basic Info"}
            ,{key:"step2",title:"Order/Payment History"}
          ],
        fields:[
          {type:"input", attribute:"email",label:"Email",validation:["email","require"]},
        ],
        validationRules:{
            email: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            name: [
              (v) => !!v || 'Name is required',
              (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
        },
        schools:[],
        family:[{name:"Tommy Lam",email:"namsouth@email.com",remark:"Try it out"}],
    };
  },mounted () {
    this.fetchData().then(schools=>this.schools=schools);
  },

  computed:{
    ...mapGetters(["userMetaData"]),
    metadata(){
      return _.cloneDeep(this.userMetaData)
    }
  }
};
</script>
<style scoped>

</style>
