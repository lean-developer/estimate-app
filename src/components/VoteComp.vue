<template>
  <b-container>
      <div v-if="vote">
          Vote {{vote.name}}
      </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';
import VoteService from '@/domain/api/vote.service'
import { Vote } from '@/domain/models/vote';

@Component({
  components: {
  },
})
export default class VoteComp extends Vue {
    private voteId!: number;
    @Model() private vote: Vote | undefined

    async created() {
      this.voteId = +this.$route.params.voteId
      this.vote = await VoteService.getVote(this.voteId)
    }
}
</script>
