<template>
    <div class="share-tip" v-show="show" @click="cancel">
    	<img :src="url" />
    </div>
</template>

<script>
export default {
	props: {
        show: {
            type: Boolean
        },
        url: {
        	type: String
        }
    },
    methods: {
    	cancel() {
    		this.$emit('enlargeCancel')
    	}
    }
   
}
</script>

<style scoped>
.share-tip{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.9);
	z-index: 100;
	overflow-y: auto;
}
.share-tip img{
	position: absolute;
	width: 100%;
	/*max-height: 100%;*/
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

</style>