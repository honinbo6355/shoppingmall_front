<template>
    <div>
        <div class="inquiry_header">
            <FaqHeader :title="'1:1 답변확인'"></FaqHeader>
            <ul class="modal-msg">
                <li> 문의하신 내용에 대한 답변은 이메일 수신 등록시 이메일로 전달됩니다.</li>
                <li> 문의 상태가 ‘처리중’인 경우는 상담원이 고객님의 문의를 처리중인 상태입니다.</li>
            </ul>
        </div>

        <hr class="divider">

        <div class="answer_header">
            <FaqHeader :title="'등록된 문의'"></FaqHeader>
        </div>

        <sui-loader class="loader" active centered inline v-if="!questionDetail.territory"/>

        <div class="table_form" v-else>
            <sui-form>
                <sui-form-field>
                    <sui-table definition>
                        <sui-table-body>
                            <sui-table-row>
                                <sui-table-cell class="form_head">카테고리</sui-table-cell>
                                <sui-table-cell>
                                    <p v-if="!updateBtn">{{questionDetail.territory}}</p>
                                    <sui-dropdown v-else
                                                  :placeholder="questionDetail.territory"
                                                  selection
                                                  :options="options"
                                                  v-model="updateQuestionObject.territory"
                                    />
                                </sui-table-cell>
                            </sui-table-row>
                            <sui-table-row>
                                <sui-table-cell class="form_head">제목</sui-table-cell>
                                <sui-table-cell>
                                    <p v-if="!updateBtn">{{questionDetail.title}}</p>
                                    <sui-input v-else class="edit-data" v-model="updateQuestionObject.title"
                                               :placeholder="questionDetail.title"/>
                                </sui-table-cell>
                            </sui-table-row>
                            <sui-table-row v-show="questionDetail.goodsTitle!=''">
                                <sui-table-cell class="form_head">문의 상품</sui-table-cell>
                                <sui-table-cell>
                                    {{questionDetail.goodsTitle}}
                                </sui-table-cell>
                            </sui-table-row>
                            <sui-table-row v-show="questionDetail.goodsTitle!=''">
                                <sui-table-cell class="form_head">문의 상품 주문번호</sui-table-cell>
                                <sui-table-cell>
                                    {{questionDetail.orderId}}
                                </sui-table-cell>
                            </sui-table-row>
                            <sui-table-row>
                                <sui-table-cell class="form_head">내용</sui-table-cell>
                                <sui-table-cell class="answer-content">
                                    <p v-if="!updateBtn">{{questionDetail.description}}</p>
                                    <sui-input v-else class="edit-data" v-model="updateQuestionObject.description"
                                               :placeholder="questionDetail.description"/>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </sui-form-field>
            </sui-form>
            <div class="btn-box">
                <sui-button basic secondary v-if="!updateBtn" @click="updateBtnChange">수정</sui-button>
                <sui-button basic secondary v-if="!updateBtn" @click="questionDelete">삭제</sui-button>
                <sui-button basic secondary v-if="updateBtn" @click="questionUpdate">수정완료</sui-button>
                <sui-button basic secondary v-if="updateBtn" @click="questionUpdateCancel">수정취소</sui-button>
            </div>
        </div>

        <div class="answer_header">
            <FaqHeader :title="'등록된 답변'"></FaqHeader>
        </div>

        <sui-loader active centered inline v-if="!answerCheck"/>

        <div class="table_form" v-else>

            <div>
                <div class="no-answer" v-if="!answer">
                    <sui-icon name="info" size="huge" circular color="grey"/>
                    <p class="no-answer-msg">등록된 답변이 없습니다.</p>
                </div>

                <sui-form v-else>
                    <sui-form-field>
                        <sui-table definition>
                            <sui-table-body>
                                <sui-table-row>
                                    <sui-table-cell class="form_head">답변 등록 일시</sui-table-cell>
                                    <sui-table-cell>
                                        {{answer.date}}
                                    </sui-table-cell>
                                </sui-table-row>
                                <sui-table-row>
                                    <sui-table-cell class="form_head">작성자</sui-table-cell>
                                    <sui-table-cell>{{answer.writer}}</sui-table-cell>
                                </sui-table-row>
                                <sui-table-row>
                                    <sui-table-cell class="form_head">답변 내용</sui-table-cell>
                                    <sui-table-cell class="answer-content">
                                        {{answer.description}}
                                    </sui-table-cell>
                                </sui-table-row>
                            </sui-table-body>
                        </sui-table>
                    </sui-form-field>
                </sui-form>
            </div>
        </div>
    </div>
</template>

<script>
    import FaqHeader from "./FaqHeader";
    import {getQuestion, getAnswer, questionDelete, questionUpdate} from "../../api/FaqApi";
    import {getCurrentUserInfo} from "../../api/UserApi";

    export default {
        name: "InquiryAnswerPost",
        data() {
            return {
                updateBtn: false,
                userInfo: '',
                options: [
                    {text: '주문내역확인', value: '주문내역확인',},
                    {text: '배송확인', value: '배송확인',},
                    {text: 'P.POINT', value: 'P.POINT',},
                    {text: '반품접수', value: '반품접수',},
                    {text: '교환접수', value: '교환접수',},
                ],
                questionDetail: {},
                answer: {},
                answerCheck: '',
                updateQuestionObject: {},
            }
        },
        components: {
            FaqHeader
        },
        async created() {
            const postId = this.$route.params.postId;
            this.questionDetail = await getQuestion(postId);
            this.updateQuestionObject = this.questionDetail;
            // this.answer = await getAnswer(postId);
            await this.getAnswerCheck(postId);
            this.userInfo = await getCurrentUserInfo();
        },
        methods: {
            async getAnswerCheck(postId) {
              this.answer = await getAnswer(postId);
              this.answerCheck = 1;
            },
            async questionDelete() {
                const postId = this.$route.params.postId;

                if (this.questionDetail.writer != this.userInfo.name) {
                    alert("삭제 권한이 없습니다.");
                } else if (this.answer) {
                    alert("답변이 완료된 문의는 삭제할 수 없습니다.");
                } else {
                    if (confirm("해당 문의를 삭제하시겠습니까?")) {
                        await questionDelete(postId);
                        alert("삭제되었습니다.")
                        this.$router.push("/board");
                        // this.goToBack();
                    }
                }
            },
            async questionUpdate() {
                this.updateBtnChange();
                alert("문의가 수정되었습니다.");
                await questionUpdate(this.updateQuestionObject);
            },
            async questionUpdateCancel() {
                //NavigationDuplicated발생 -> 구글링해서 .catch ~~를 달아주니 오류는 해결
                //아마 현재 페이지에서 또 현재페이지로 router를 날려서 그런것으로 추정
                this.$router.push("/answer/" + this.questionDetail.postId).catch(err => {
                    if (err.name != "NavigationDuplicated") {
                        throw err;
                    }
                });

                // this.questionDetail = await getQuestion(this.questionDetail.postId);

                this.updateBtn = true;
            },
            updateBtnChange() {
                if (this.questionDetail.writer != this.userInfo.name) {
                    alert("수정 권한이 없습니다.");
                } else if (this.answer) {
                    alert("답변이 완료된 문의는 수정할 수 없습니다.");
                } else if (!this.updateBtn) {
                    this.updateBtn = true;
                } else {
                    this.updateBtn = false;
                }
            },
            // goToBack() {
            //     this.$router.go(-2);
            // },
        },
    }
</script>

<style scoped>

    .table_form {
        margin-top: 40px;
    }

    .modal-msg li {
        margin-bottom: 10px;
    }

    .modal-msg, .table_form {
        margin-bottom: 40px;
    }

    .inquiry_header {
        position: relative;
        border-top: 3px solid #000;
    }

    .answer_header {
        border-bottom: 2px solid #000;
    }

    .form_head {
        height: 60px !important;
        width: 200px !important;
        text-align: center !important;
    }

    td {
        padding: 11px 20px !important;
    }

    .answer-content {
        line-height: 200%;
    }

    .no-answer {
        width: 100%;
        text-align: center;
        margin-top: 100px;
    }

    .no-answer-msg {
        margin-top: 50px;
        font-weight: bold;
        color: gray;
    }

    .btn-box {
        text-align: right;
        margin: 15px 0;
    }

    .divider {
        margin: 40px 0;
    }

    .loader {
        margin-top: 40px !important;
    }
</style>