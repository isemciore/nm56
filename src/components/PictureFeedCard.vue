<template>
  <v-col
    cols="12"
    :md="size === 2 ? 6 : size === 3 ? 4 : size === 4 ? 3 : size === 6 ? 2 : size === 12 ? 1 : undefined"
  >
    <base-card
      :height="size===12 ? 75: value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      @click="dialog=true"
    >
      <v-img
        :src="require(`@/assets/bilder/${size===12 ? value.thumbnail: value.compressedImg}`)"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-row
          v-if="!value.prominent"
          class="fill-height text-right ma-0"
        >
          <v-col v-if="size!== 12" cols="12">
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop=""
            >
              {{ value.category }}
            </v-chip>

            <h3 class="title font-weight-bold mb-2">
              {{ value.title }}
            </h3>

            <div class="caption">
              {{ value.author }}<br>Date
            </div>
          </v-col>

          <v-col align-self="end">
            <v-chip v-if="size!== 12"
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              @click="dialog=true"
            >Mer</v-chip>
            <v-dialog v-if="value.original" v-model="dialog" max-width="800px">
              <template>
                <v-card class="ma-0 pa-0" style="max-width: 800px;">
                    <v-img
                      :src="require(`@/assets/bilder/${value.original}`)"
                    ></v-img>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-img>
    </base-card>
  </v-col>
</template>

<script>
  export default {
    name: 'PictureFeedCard',
    components: {
    },
    data: () => ({
      dialog:false
    }),
    props: {
      size: {
        type: Number,
        required: true,
      },
      value: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
