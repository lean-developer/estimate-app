<template>
    <b-container>
      <div v-if="votes">
        <ul v-for="v in votes" :key="v.id">
          <li>{{v.name}} ({{v.id}})</li>
        </ul>
      </div>
      <b-card
        title="Neue Abstimmung"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          <b-input type="text" v-model="abstimmung"></b-input>
        </b-card-text>

        <b-button href="#" variant="primary" @click="onStartVote()">Abstimmung starten</b-button>
      </b-card>
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
export default class Home extends Vue {
  @Model() private votes: Vote[] | undefined;
  private abstimmung: string = '';

  async created() {
    this.votes = await VoteService.getVotes();
  }

  async onStartVote() {
    const newVote: Vote | undefined = await VoteService.createVote(this.abstimmung);
    if (newVote) {
      this.$router.push({ name: 'Vote', params: { voteId: newVote.id.toString() } })
    }
  }
}
</script>
