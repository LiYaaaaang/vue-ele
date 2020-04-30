<template>
	<div class="city">
		<div class="search_wrap">
			<div class="search">
				<i class="fa fa-search"></i>
				<input v-model="city_val" type="text" placeholder="输入城市名" />
			</div>
			<button @click="$router.push({ name: 'Address', params: { city: city } })">取消</button>
		</div>
		<div style="height:100%" v-if="searchList.length == 0">
			<div class="location">
				<Location @click="selectCity({ name: city })" :address="city"></Location>
			</div>
			<Alphabet @selectCity="selectCity" :cityInfo="cityInfo" :keys="keys" ref="allcity"></Alphabet>
		</div>
		<!-- 搜索完的城市列表 -->
		<div class="search_list" v-else>
			<ul>
				<li @click="selectCity(item)" v-for="(item, index) in searchList" :key="index">{{ item.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Location from '../components/Location';
import Alphabet from '../components/Alphabet';
export default {
	name: 'City',
	components: {
		Location,
		Alphabet,
	},
	computed: {
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
			city_val: '',
			cityInfo: null,
			keys: [],
			allCities: [], //用来接收城市的名称
			searchList: [], //检索出来的城市数组
		};
	},
	created() {
		this.getCityInfo();
	},
	watch: {
		city_val() {
			this.searchCity();
		},
	},
	methods: {
		//请求城市数据
		async getCityInfo() {
			try {
				const result = await this.$axios('/api/posts/cities');
				this.cityInfo = result.data;
				//处理key 计算key
				this.keys = Object.keys(result.data);
				// console.log(this.keys);
				// hotcities这个key移除掉
				this.keys.pop();
				// keys 排序
				this.keys.sort();
				//$nextTick是页面数据请求完成以后才会走回调函数里面的方法
				this.$nextTick(() => {
					this.$refs.allcity.initScroll();
				});

				//存储所有城市用来搜索过滤
				this.keys.forEach(key => {
					this.cityInfo[key].forEach(city => {
						this.allCities.push(city);
					});
				});
			} catch (err) {}
		},
		//点击城市跳转会收货地址页
		selectCity(city) {
			this.$router.push({ name: 'Address', params: { city: city.name } });
		},
		//搜索事件
		searchCity() {
			if (!this.city_val) {
				//如果搜索框为空，那么数组为空
				this.allCities = [];
				this.searchList = [];
			} else {
				//根据输入框的关键字检索城市，并存入searchList数组中
				this.searchList = this.allCities.filter(item => {
					return item.name.indexOf(this.city_val) != -1;
				});
			}
		},
	},
};
</script>

<style scoped>
.city {
	width: 100%;
	height: 100%;
	overflow: auto;
	box-sizing: border-box;
	padding-top: 45px;
}
.search_wrap {
	position: fixed;
	top: 0;
	height: 45px;
	width: 100%;
	background: #fff;
	box-sizing: border-box;
	padding: 3px 16px;
	display: flex;
	justify-content: space-between;
}
.search {
	background-color: #eee;
	border-radius: 10px;
	line-height: 40px;
	width: 85%;
	box-sizing: border-box;
	padding: 0 16px;
}
.search input {
	background: #eee;
	outline: none;
	border: none;
	margin-left: 5px;
}
.search_wrap button {
	outline: none;
	color: #009eef;
}
.location {
	background: #fff;
	padding: 8px 16px;
	height: 65px;
	box-sizing: border-box;
}
.search_list {
	background: #fff;
	padding: 5px 16px;
}
.search_list li {
	padding: 10px;
	border-bottom: 1px solid #eee;
}
</style>
