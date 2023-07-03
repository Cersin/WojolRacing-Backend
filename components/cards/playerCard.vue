<template>
  <div class="personal-card">
    <div class="personal-card--borders" />

    <div class="personal-card--borders-2" />
    <div class="personal-card--borders-3" />
    <div class="personal-card--borders-4" />


    <div class="personal-card--container">
      <div class="personal-card--logo"><img src="/logo_wojol.png"/> </div>
      <img src="/personalcard/person_white.png"/>
      <div class="personal-card--team">
        <div class="personal-card--number">{{ overall }}</div>
        {{ team }}
      </div>
      <div class="personal-card--nick" :title="name">{{ name }}</div>
      <div class="personal-card--statistics">
        <div class="personal-card--arrow"/>
        <div class="personal-card--arrow-2"/>
        <div class="personal-card--stat">
          <div class="personal-card--rate">{{ +experience }}</div>
          <div class="personal-card--description">EXP</div>
        </div>

        <div class="personal-card--stat">
          <div class="personal-card--rate">{{ +racePace }}</div>
          <div class="personal-card--description">RAC</div>
        </div>

        <div class="personal-card--stat">
          <div class="personal-card--rate">{{ +awareness }}</div>
          <div class="personal-card--description">AWA</div>
        </div>

        <div class="personal-card--stat">
          <div class="personal-card--rate">{{ +pace }}</div>
          <div class="personal-card--description">PAC</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  experience: {
    type: [String, Number],
    required: true,
  },
  awareness: {
    type: [String, Number],
    required: true,
  },
  pace: {
    type: [String, Number],
    required: true,
  },
  racePace: {
    type: [String, Number],
    required: true,
  },
  overall: {
    type: [String, Number],
    required: true,
  },
})

function calculateOverall() {
  const racePaceRate = 0.4;
  const paceRate = 0.3;
  const awarenessRate = 0.15;
  const experienceRate = 0.15;

  return (racePaceRate * +props.racePace)
      + (paceRate * +props.pace)
      + (awarenessRate * +props.awareness)
    + (experienceRate * +props.experience);
}
</script>


<style scoped lang="scss">
@import "styles/variables";

.personal-card {
  width: 225px;
  height: 300px;
  position: relative;
  z-index: 999;
  -webkit-filter: blur(.5px);
  -moz-filter: blur(.5px);
  -o-filter: blur(.5px);
  -ms-filter: blur(.5px);
  filter: blur(.5px);
}

.personal-card--container {
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(13, 15, 21, 1) 4%, rgba(40, 75, 105, 1) 100%);
  clip-path: polygon(18.3% 0%, 100% 0%, 100% 12.3%, 100% 87.7%, 100.4% 100%, 0% 100%, 0% 78.8%, 0% 15.1%);
  border-color: white;
  border: solid;
  border-width: 0 0px 3px 3px;
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;

  img {
    width: 50%;
  }

  .personal-card--number {
    position: absolute;
    bottom: 44%;
    right: 25%;
    padding: 4px 11px;
    border-radius: 14px;
    background-color: $color-primary;
    font-size: 24px;
    color: black;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.personal-card--logo {
  position: absolute;
  top: 0;
  right: 3%;
  width: 75px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.personal-card:before {
  content: "";
  position: absolute;
  top: 3%;
  left: 9%;
  width: 3px;
  height: 15px;
  transform: rotate(45deg);
  background-color: white;
}

.personal-card--borders {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0%;
  left: 3%;
  border: solid $color-primary;
  border-width: 8px 0 0 8px;
  clip-path: polygon(0 0, 100% 0%, 100% 5%, 0 100%);
  z-index: 900;
}

.personal-card--borders-2 {
  position: absolute;
  width: 50px;
  height: 55px;
  top: -11px;
  left: -5px;
  border: solid $color-primary;
  border-width: 8px 0 0 8px;
  clip-path: polygon(0 0, 100% 0%, 100% 5%, 0 100%);
  z-index: 900;
}

.personal-card--borders-3 {
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  top: -10px;
  border: solid $color-primary;
  border-width: 0 8px 0 0;
  clip-path: polygon(82% 0, 100% 3%, 100% 85%, 0 100%, 0 0);
  z-index: 900;
}

.personal-card--borders-4 {
  position: absolute;
  width: 50px;
  height: 92%;
  right: -15px;
  top: 0;
  border: solid $color-primary;
  border-width: 0 8px 0 0;
  clip-path: polygon(82% 0, 100% 3%, 100% 85%, 0 100%, 0 0);
  z-index: 900;
}

.personal-card--team {
  margin-top: 16px;
  font-size: 11px;
  font-weight: 400px;
}

.personal-card--nick {
  text-align: center;
  margin-top: 16px;
  max-width: 160px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.personal-card--statistics {
  display: flex;
  margin-top: 3px;
  flex-direction: row;
  position: relative;
  width: 75%;
  justify-content: space-evenly;
  background-color: #2e2e2e;
  padding: 4px;

  .personal-card--arrow {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    border: $color-primary solid;
    border-width: 2.7px 2.7px 0 0;
    transform: rotate(90deg);
  }

  .personal-card--arrow-2 {
    position: absolute;
    bottom: -7px;
    right: -7px;
    width: 12px;
    height: 12px;
    border: $color-primary solid;
    border-width: 2.7px 2.7px 0 0;
    transform: rotate(90deg);
  }

  .personal-card--stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: center;
    opacity: 0.8;

    .personal-card--rate {
      font-size: 22px;
    }

    .personal-card--description {
      font-size: 12px;
    }
  }
}

</style>