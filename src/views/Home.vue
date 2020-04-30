<template>
	<div class="home">
		<div class="header">
			<div class="address_map" @click="$router.push({ name: 'Address', params: { city: city } })">
				<i class="fa fa-map-marker"></i>
				<span>{{ address }}</span>
				<i class="fa fa-sort-desc"></i>
			</div>
		</div>
		<div class="search_wrap" :class="{ fixedview: showFilter }" @click="$router.push('/search')">
			<div class="shop_search">
				<i class="fa fa-search"></i>
				搜索商家 商家名称
			</div>
		</div>
		<div class="container">
			<!-- 轮播 -->
			<mt-swipe :auto="4000" class="swiper">
				<mt-swipe-item v-for="(img, index) in swipeImgs" :key="index">
					<img :src="img" alt />
				</mt-swipe-item>
			</mt-swipe>
			<!-- 分类 -->
			<mt-swipe :auto="0" class="entries">
				<mt-swipe-item v-for="(entry, i) in entries" :key="i" class="entry_wrap">
					<div class="foodentry" v-for="(item, index) in entry" :key="index">
						<div class="img_wrap">
							<img :src="item.image" alt />
						</div>
						<span>{{ item.name }}</span>
					</div>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 推荐商家 -->
		<div class="shoplist-title">推荐商家</div>
		<!-- 导航 -->
		<FilterView :filterData="filterData" @searchFixed="showFilterView" @update="update"></FilterView>
		<!-- 商家信息 -->
		<mt-loadmore
			:top-method="loadData"
			:bottom-method="loadMore"
			:bottom-all-loaded="allLoaded"
			:auto-fill="false"
			:bottomPullText="bottomPullText"
			ref="loadmore"
		>
			<div class="shaolist">
				<IndexShop v-for="(item, index) in restaurants" :key="index" :restaurant="item.restaurant"></IndexShop>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Loadmore } from 'mint-ui';
import FilterView from '../components/FilterView';
import IndexShop from '../components/IndexShop';
export default {
	name: 'home',
	computed: {
		address() {
			return this.$store.getters.address;
		},
		city() {
			//拿到城市或者省份
			return (
				this.$store.getters.location.addressComponent.city ||
				this.$store.getters.location.addressComponent.province
			);
		},
	},
	data() {
		return {
			swipeImgs: [],
			entries: [],
			filterData: null,
			showFilter: false,
			page: 1, //页数
			size: 5, //条数
			restaurants: [], //存放所有商家容器
			allLoaded: false, //是否都加载完
			bottomPullText: '上拉加载更多',
			data: null,
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			try {
				const result = await this.$axios.get('/api/profile/shopping');
				this.swipeImgs = result.data.swipeImgs;
				this.entries = result.data.entries;
			} catch (err) {
				console.log(err);
			}
			try {
				const result = await this.$axios.get('/api/profile/filter');
				this.filterData = result.data;
				// console.log(result);
			} catch (err) {
				console.log(err);
			}
			this.loadData();
		},
		async loadData() {
			try {
				this.page = 1;
				this.allLoaded = false;
				this.bottomPullText = '上拉加载更多';
				//拉取商家信息
				const result = await this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data);
				this.$refs.loadmore.onTopLoaded();
				this.restaurants = result.data;
				// console.log(result);
			} catch (err) {
				console.log(err);
			}
		},
		async loadMore() {
			if (!this.allLoaded) {
				try {
					this.page++;
					//拉取商家信息
					const result = await this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`);
					//加载完之后重新渲染
					this.$refs.loadmore.onBottomLoaded();
					if (result.data.length > 0) {
						//还有更多数据拉取
						result.data.forEach(item => {
							this.restaurants.push(item);
						});
						//判断如果拉取的数据小于默认一页的5条，说明这是最后的数据了
						if (result.data.length < this.size) {
							this.allLoaded = true;
							this.bottomPullText = '没有更多了哦';
						}
					} else {
						//没有更多数据了，数据为空
						this.allLoaded = true;
						this.bottomPullText = '没有更多了哦';
					}
				} catch (err) {
					console.log(err);
				}
			}
		},
		showFilterView(isShow) {
			this.showFilter = isShow;
		},
		update(condition) {
			// console.log(condition);
			this.data = condition;
			this.loadData();
		},
	},
	components: {
		FilterView,
		IndexShop,
	},
};
</script>

<style scoped>
.home {
	width: 100%;
	height: 100%;
	overflow: auto;
	box-sizing: border-box;
}
.header,
.search_wrap {
	background-color: #009eef;
	padding: 10px 16px;
}
.header .address_map {
	color: #fff;
	font-weight: bold;
}
.address_map i {
	margin: 0 3px;
	font-size: 18px;
}
.address_map span {
	display: inline-block;
	width: 80%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.search_wrap .shop_search {
	background-color: #fff;
	padding: 10px 0;
	border-radius: 4px;
	text-align: center;
	color: #aaa;
}

.search_wrap {
	position: sticky;
	top: 0px;
	z-index: 999;
	box-sizing: border-box;
}
.swiper {
	height: 100px;
}
.swiper img {
	width: 100%;
	height: 100px;
}

.entries {
	background: #fff;
	height: 47.2vw;
	text-align: center;
	overflow: hidden;
}
.foodentry {
	width: 20%;
	float: left;
	position: relative;
	margin-top: 2.933333vw;
}
.foodentry .img_wrap {
	position: relative;
	display: inline-block;
	width: 12vw;
	height: 12vw;
}
.img_wrap img {
	width: 100%;
	height: 100%;
}
.foodentry span {
	display: block;
	color: #666;
	font-size: 0.32rem;
}

/* 推荐商家 */
.shoplist-title {
	display: flex;
	align-items: flex;
	justify-content: center;
	height: 9.6vw;
	line-height: 9.6vw;
	font-size: 16px;
	color: #333;
	background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
	display: block;
	content: '一';
	width: 5.333333vw;
	height: 0.266667vw;
	color: #999;
}
.shoplist-title:before {
	margin-right: 3.466667vw;
}
.shoplist-title:after {
	margin-left: 3.466667vw;
}

.fixedview {
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 999;
}

.mint-loadmore {
	height: calc(100% - 95px);
	overflow: auto;
}

/* 滚动条 */
::-webkit-scrollbar {
	width: 0 !important;
}
</style>
