<script setup lang="ts">
import { assetUrl } from "../../lib/assets";
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 h-[60px] bg-[#171614] text-white"
  >
    <div class="mx-auto flex h-full w-full max-w-[1480px] items-center px-4 sm:px-6 lg:px-8">
      <a class="flex shrink-0 items-center gap-2.5" aria-label="Brassworks home">
        <img
          :src="assetUrl('/images/icon.png')"
          alt=""
          width="40"
          height="40"
          class="h-10 w-10 object-contain"
        />
        <span class="hidden text-[15px] font-bold tracking-[0.08em] sm:block">BRASSWORKS</span>
      </a>
    </div>
  </header>
</template>
