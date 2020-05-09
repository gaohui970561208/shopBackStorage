<style lang="less">
.admin_wrap {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	transition: all 0.3s linear;
	.nav_wrap {
		width: 200px;
		height: 100%;
		background-color: rgba(253, 182, 255, 0.2);
		transition: all 0.3s linear;
		flex-shrink: 1;
	}
	.nav {
		width: 100%;
		.nav_item {
			margin: 5px 0;
			width: 100%;
			height: 70px;
			display: flex;
			background-color: rgb(255, 225, 253);
			border-radius: 30px 0 0 30px;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: all 0.3s linear;
		}
		.active_nav {
			background-color: rgb(209, 209, 209);
		}
		.icon {
			font-size: 24px;
			color: rgb(66, 66, 66);
		}
		span {
			padding-left: 20px;
			font-size: 20px;
			color: rgb(66, 66, 66);
		}
	}
	.nav_item_wrap {
		width: calc(100vw - 200px);
		flex: 1;
		.classify_table_wrap {
			box-sizing: border-box;
			padding: 20px 30px;
			width: 100%;
			position: relative;
		}
		.classify_table {
			margin-top: 50px;
		}
		.classify_operate {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: center;
		}
		.title {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.classify_imt_wrap {
			width: 80px;
			height: 80px;
			border-radius: 5px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 100%;
				height: 100%;
				vertical-align: top;
			}
		}
	}
	.classify_edit {
		width: 100%;
		.classify_item {
			margin-top: 30px;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			&:first-child {
				margin-top: 0;
			}
			.label {
				font-size: 16px;
				width: 100px;
				flex-shrink: 0;
			}
			.text {
				font-size: 16px;
				border: 1px solid rgba(253, 182, 255, 0.2);
			}
			.classify_img {
				width: 100%;
				img {
					width: 80px;
					height: 80px;
					border-radius: 5px;
				}
			}
		}
	}
}
@media screen and (max-width: 1400px) {
	.admin_wrap {
		.nav_wrap {
			width: 100px;
		}
		.nav {
			width: 100%;
			.nav_item {
				width: 100%;
				height: 100px;
				display: flex;
				background-color: rgb(209, 209, 209);
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
				border-radius: 30px 0 0 30px;
			}
			.active_nav {
				background-color: rgb(138, 138, 138);
			}
			.nav_text {
				display: none;
			}
			.icon {
				font-size: 40px;
				color: #ffffff;
			}
			span {
				padding-left: 0;
				padding-top: 10px;
				font-size: 20px;
				color: #ffffff;
			}
		}
	}
	.nav_item_wrap {
		width: calc(100vw - 100px);
		flex: 1;
	}
}
</style>
<template>
	<div class="admin_wrap">
		<div class="nav_wrap">
			<div class="nav">
				<div class="nav_item active">
					<i class="icon iconfont iconcategory"></i>
					<span class="nav_text">分类管理</span>
				</div>
			</div>
		</div>
		<div class="nav_item_wrap">
			<div class="classify_table_wrap">
				<div class="title">
					<div class="title_text">分类列表</div>
					<el-button type="primary" class="add_classify" @click="addClassifyDialog">添加分类</el-button>
				</div>
				<el-table class="classify_table" :data="list" style="width: 100%">
					<el-table-column prop="classifyId" label="类型编号" width="180"> </el-table-column>
					<el-table-column prop="classifyName" label="类型名称" width="180"> </el-table-column>
					<el-table-column prop="classifyImg" label="类型代表图片">
						<template slot-scope="scope">
							<div class="classify_imt_wrap">
								<img :src="scope.row.classifyImg" alt="" />
							</div>
						</template>
					</el-table-column>
					<el-table-column width="200" label="操作">
						<template slot-scope="scope">
							<div class="classify_operate">
								<el-button @click="updateClassifyDialog(scope.row)">修改</el-button>
								<el-button @click="deleteClassifyDialog(scope.row)">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog :title="editTitle" :visible.sync="classifyShow" width="30%">
			<div class="classify_edit">
				<div class="classify_item">
					<div class="label">分类名称</div>
					<el-input class="text" v-model="classifyData.classifyName" placeholder="请输入分类名称"></el-input>
				</div>
				<div class="classify_item">
					<div class="label">分类图片</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="getFile">
						<div class="classify_img">
							<img :src="classifyData.classifyImg" alt="" v-if="classifyData.classifyImg" />
							<div class="upload_text" v-else>
								<el-button class="up_text">上传分类代表图片</el-button>
							</div>
						</div>
					</el-upload>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="classifyShow = false">取 消</el-button>
				<el-button type="primary" @click="addClassify">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { product, errors } from '@/api';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo,
			classifyList: state => state.classify.classifyList
		}),
		list() {
			return this.classifyList;
		}
	},
	data() {
		return {
			classifyShow: false,
			editTitle: '添加分类',
			addStatus: true,
			classifyData: {
				classifyName: '',
				classifyImg: null
			}
		};
	},
	mounted() {
		//验证是否为管理员，非管理退出
		if (!this.userInfo.isAdmin) {
			this.$router.go(-1);
		}
	},
	methods: {
		...mapActions({
			getClassifyList: 'classify/setClassifyList'
		}),
		addClassifyDialog() {
			this.addStatus = true;
			this.classifyData = {
				classifyName: '',
				classifyImg: null
			};
			this.classifyShow = true;
		},
		getFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.classifyData.classifyImg = baseStr;
			};
		},
		async addClassify() {
			try {
				const params = {
					classifyId: this.classifyData.classifyId || null
				};
				const reData = {
					classifyName: this.classifyData.classifyName,
					classifyImg: this.classifyData.classifyImg
				};
				if (this.addStatus) {
					const { data, ok } = await product.addClassify(reData);
					if (!ok) return;
					this.$message.success(data.msg);
					this.getClassifyList();
					this.classifyShow = false;
				} else {
					const { data, ok } = await product.updateClassify(params, reData);
					if (!ok) return;
					this.$message.success(data.msg);
					this.getClassifyList();
					this.classifyShow = false;
				}
			} catch (error) {
				errors(error);
			}
		},
		deleteClassifyDialog(data) {
			this.$confirm('是否删除', '删除分类')
				.then(() => {
					this.deleteClassify(data);
				})
				.catch(() => {
					return;
				});
		},
		async deleteClassify({ classifyId }) {
			try {
				const { data, ok } = await product.deleteClassify(classifyId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getClassifyList();
			} catch (error) {
				errors(error);
			}
		},
		updateClassifyDialog(data) {
			this.addStatus = false;
			this.classifyData = JSON.parse(JSON.stringify(data));
			this.classifyShow = true;
		}
	}
};
</script>
