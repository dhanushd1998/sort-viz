import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorting-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css'],
})
export class SortingVisualizerComponent implements OnInit {
  array: number[] = [];
  sortingSpeed: number = 50; // Adjust for animation speed

  constructor() {}

  ngOnInit(): void {
    this.generateArray();
  }

  generateArray(): void {
    this.array = [];
    for (let i = 0; i < 50; i++) {
      this.array.push(Math.floor(Math.random() * 400) + 5);
    }
  }

  // Bubble Sort
  async bubbleSort() {
    const arr = this.array;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.array = [...arr];
          await this.sleep(this.sortingSpeed);
        }
      }
    }
  }

  // Selection Sort
  async selectionSort() {
    const arr = this.array;
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      this.array = [...arr];
      await this.sleep(this.sortingSpeed);
    }
  }

  // Insertion Sort
  async insertionSort() {
    const arr = this.array;
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        this.array = [...arr];
        await this.sleep(this.sortingSpeed);
      }
      arr[j + 1] = key;
      this.array = [...arr];
    }
  }

  // Merge Sort
  async mergeSort() {
    const arr = this.array;
    await this.mergeSortHelper(arr, 0, arr.length - 1);
    this.array = [...arr];
  }

  private async mergeSortHelper(arr: number[], left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);

    await this.mergeSortHelper(arr, left, mid);
    await this.mergeSortHelper(arr, mid + 1, right);
    await this.merge(arr, left, mid, right);
  }

  private async merge(arr: number[], left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
      this.array = [...arr];
      await this.sleep(this.sortingSpeed);
    }

    while (i < leftArr.length) {
      arr[k++] = leftArr[i++];
      this.array = [...arr];
      await this.sleep(this.sortingSpeed);
    }

    while (j < rightArr.length) {
      arr[k++] = rightArr[j++];
      this.array = [...arr];
      await this.sleep(this.sortingSpeed);
    }
  }

  // Quick Sort
  async quickSort() {
    const arr = this.array;
    await this.quickSortHelper(arr, 0, arr.length - 1);
    this.array = [...arr];
  }

  private async quickSortHelper(arr: number[], low: number, high: number) {
    if (low < high) {
      const pi = await this.partition(arr, low, high);
      await this.quickSortHelper(arr, low, pi - 1);
      await this.quickSortHelper(arr, pi + 1, high);
    }
  }

  private async partition(arr: number[], low: number, high: number): Promise<number> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        this.array = [...arr];
        await this.sleep(this.sortingSpeed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    this.array = [...arr];
    await this.sleep(this.sortingSpeed);
    return i + 1;
  }

  // Sleep function for animation delay
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
