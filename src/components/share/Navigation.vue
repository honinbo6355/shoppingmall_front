<template>
    <div class="nav-set">
        <div class="category-nav">
            <sui-accordion exclusive>
                <sui-accordion-title class="nav-title" :active="isActive">
                    <div class="title-text">카테고리</div>
                    <div class="title-icon">
                        <sui-icon name="dropdown"/>
                    </div>
                </sui-accordion-title>
                <sui-accordion-content :active="isActive">
                    <div class="nav-content">
                        <ul>
                            <li class="sub-category" v-for="(categoryData, index) in categoryList"
                                :key="index"
                                @click="changeCategory(categoryData.categoryCode)">{{categoryData.name}}
                            </li>
                        </ul>
                    </div>
                </sui-accordion-content>
                <sui-accordion-title>
                    <div class="nav-title">
                        <div class="title-text">가격대</div>
                        <div class="title-icon">
                            <sui-icon name="dropdown"/>
                        </div>
                    </div>
                </sui-accordion-title>
                <sui-accordion-content>
                    <div class="nav-content">
                        <sui-form>
                            <sui-form-field>
                                <sui-checkbox radio label="전체" value="1" v-model="priceOption"
                                              @change="radioChange"/>
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox radio label="5만원 이하" value="2" v-model="priceOption"
                                              @change="radioChange"/>
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox radio label="5만원 ~ 10만원" value="3" v-model="priceOption"
                                              @change="radioChange"/>
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox radio label="10만원 ~ 30만원" value="4" v-model="priceOption"
                                              @change="radioChange"/>
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox radio label="직접 입력" value="5" v-model="priceOption"/>
                            </sui-form-field>
                            <sui-form-field>
                                <input type="number" placeholder="최저가" maxlength="8" v-model="selfMinPrice"
                                        @focus="inputRadioChange"
                                       @keyup.enter="setPriceRange"/>
                            </sui-form-field>
                            <sui-form-field>
                                <input type="number" placeholder="최고가" maxlength="8" v-model="selfMaxPrice"
                                        @focus="inputRadioChange"
                                       @keyup.enter="setPriceRange"/>
                            </sui-form-field>
                            <sui-button secondary type="button" @click="setSelfPriceRange">검색</sui-button>
                        </sui-form>
                    </div>
                </sui-accordion-content>
            </sui-accordion>
        </div>
        <sui-button basic color="black" content="초기화" icon="redo" class="reset" @click="reset"/>

    </div>
</template>

<script>

    export default {
        name: "Navigation",
        components: {},
        props: [
            "categoryList",
            "isActive",
        ],
        data() {
            return {
                priceOption: "1",
                minPrice: "",
                maxPrice: "",
                selfMinPrice: "",
                selfMaxPrice: "",
            }
        },
        methods: {
            changeCategory(categoryCode) {
                this.$emit("changeCategory", categoryCode);
            },
            changePriceRange() {
                this.$emit("changePriceRange", this.minPrice, this.maxPrice);
            },
            radioChange() {
                this.selfMinPrice = "";
                this.selfMinPrice = "";
                
                switch (this.priceOption) {
                    case "1":
                        this.minPrice = "";
                        this.maxPrice = "";
                        break;
                    case "2":
                        this.minPrice = "0";
                        this.maxPrice = "50000";
                        break;
                    case "3":
                        this.minPrice = "50000";
                        this.maxPrice = "100000";
                        break;
                    case "4":
                        this.minPrice = "100000";
                        this.maxPrice = "300000";
                        break;
                }
                this.changePriceRange();
            },
            inputRadioChange() {
                this.priceOption = "5";
            },
            setSelfPriceRange() {
                if (this.selfMinPrice == "") {
                    alert("최저가를 입력해주세요");
                } else if (this.selfMaxPrice == "") {
                    alert("최고가를 입력해주세요");
                } else if (this.selfMinPrice > this.selfMaxPrice) {
                    alert("최고가는 최저가보다 커야합니다.")
                } else {
                    this.minPrice = this.selfMinPrice;
                    this.maxPrice = this.selfMaxPrice;
                    this.changePriceRange();
                }
            },
            reset() {
                this.priceOption = "1";
                this.minPrice = "";
                this.maxPrice = "";
                this.selfMinPrice = "";
                this.selfMaxPrice = "";
                this.changePriceRange();
                this.changeCategory("");
            },
        },
    }
</script>

<style scoped>
    .nav-set {
        float: left;
        width: 210px;
        padding: 0;
        margin-bottom: 24px;
        margin-right: 62px;
        border-bottom: 0;
    }

    .category-nav {
        border-top: 3px solid #000;
        border-bottom: 3px solid #000;
        margin-bottom: 24px;
    }

    .reset {
        width: 100%;
    }

    .ui.accordion .title {
        margin: 0;
        padding: 0;
        height: 56px;
        line-height: 56px;
    }

    .nav-title {
        border-top: 1px solid #ededed;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(237, 237, 237);
    }

    .title-text {
        float: left;
        font-size: 14px;
        font-weight: 700;
    }

    .title-icon {
        float: right;
    }

    .nav-content {
        padding-bottom: 15px;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        margin-top: 12px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

</style>