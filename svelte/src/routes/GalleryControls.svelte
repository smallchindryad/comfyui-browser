<script lang="ts">
  import type { GallerySettings, SizeMode, FitMode } from '$lib/gallerySettings';
  import { createEventDispatcher } from 'svelte';

  export let settings: GallerySettings;

  const dispatch = createEventDispatcher<{
    change: GallerySettings;
  }>();

  function updateSettings(updates: Partial<GallerySettings>) {
    settings = { ...settings, ...updates };
    dispatch('change', settings);
  }

  function toggleCompact() {
    updateSettings({ compact: !settings.compact });
  }

  const sizeOptions: { value: SizeMode; label: string }[] = [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L' },
    { value: 'xlarge', label: 'XL' },
  ];

  const fitOptions: { value: FitMode; label: string }[] = [
    { value: 'contain', label: 'Fit' },
    { value: 'cover', label: 'Fill' },
  ];
</script>

<div class="flex flex-wrap items-center gap-4 p-3 bg-base-200 border-b border-base-300">
  <!-- Compact Mode Toggle -->
  <div class="flex items-center gap-2">
    <label class="label cursor-pointer gap-2">
      <span class="text-sm font-medium text-base-content/70">Compact:</span>
      <input
        type="checkbox"
        class="toggle toggle-sm"
        checked={settings.compact}
        on:change={toggleCompact}
      />
    </label>
  </div>

  <!-- Size Control -->
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium text-base-content/70">Size:</span>
    <div class="btn-group">
      {#each sizeOptions as option}
        <button
          class="btn btn-sm"
          class:btn-active={settings.size === option.value}
          on:click={() => updateSettings({ size: option.value })}
        >
          {option.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Fit Mode Control -->
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium text-base-content/70">Fit:</span>
    <div class="btn-group">
      {#each fitOptions as option}
        <button
          class="btn btn-sm"
          class:btn-active={settings.fit === option.value}
          on:click={() => updateSettings({ fit: option.value })}
        >
          {option.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Info tooltip (optional) -->
  <div class="tooltip tooltip-bottom ml-auto" data-tip="Gallery view settings are saved automatically">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="w-5 h-5 stroke-base-content/50"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
</div>

<style>
  .btn-group .btn {
    border-radius: 0;
  }
  .btn-group .btn:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .btn-group .btn:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
</style>
