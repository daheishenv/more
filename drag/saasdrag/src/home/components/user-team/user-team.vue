<template>
	<view>
		<template v-if="cmptStyle_ === 'style1'">
			<sub-home-user-team-style1 @inviteToFriend="inviteToFriend" @getUserInfo="getUserInfo" :userInfo="userInfo" :teamCount="teamCount" />
		</template>
		<template v-else-if="cmptStyle_ === 'style2'">
			<sub-home-user-team-style2 @inviteToFriend="inviteToFriend" @getUserInfo="getUserInfo" :userInfo="userInfo" :teamCount="teamCount" />
		</template>
		<template v-else-if="cmptStyle_ === 'style3'">
			<sub-home-user-team-style2 @inviteToFriend="inviteToFriend" @getUserInfo="getUserInfo" :userInfo="userInfo" :teamCount="teamCount" />
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			userInfo: {
				type: Object,
				default: () => {
					return {}
				},
			},
			teamCount: {
				type: Object,
				default: () => {
					return {}
				},
			},
		},
		methods: {
			inviteToFriend() {
				this.$emit('inviteToFriend', {
					type: 'inviteToFriend',
					detail: {},
				})
			},
			getUserInfo() {
				this.$emit('getUserInfo', {
					type: 'getUserInfo',
					detail: {},
				})
			},
		},
	}
</script>