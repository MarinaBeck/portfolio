import { ref, onMounted, onUnmounted } from "vue";
import type FloatingCursor from "@/components/hover/FloatingCursor.vue";

export function useFloatingCursor() {
    const active = ref<boolean>(false);
    const cursor = ref<InstanceType<typeof FloatingCursor> | null>(null);

    function onMove(event: PointerEvent): void {
        cursor.value?.moveCursor(event);
    }

    function onEnter(event?: PointerEvent): void {
        active.value = true;
        if (event) onMove(event);
    }

    function onLeave(): void {
        active.value = false;
    }

    onMounted(() => {
        window.addEventListener("pointermove", onMove);
    });

    onUnmounted(() => {
        window.removeEventListener("pointermove", onMove);
    });

    return {
        active,
        cursor,
        onEnter,
        onLeave,
    };
}