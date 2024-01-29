// admin-charts.component.ts
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Chart, registerables  } from 'chart.js';
import { ProductsEventsService } from 'src/app/core/services/products/products-events.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.scss']
})
export class AdminChartsComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  data: any[] = [];
  categories: any[] = [];
  productDeletedSub!: Subscription;

  constructor(
    private productService: ProductsService,
    private productsEventsService: ProductsEventsService,) {}

  ngOnInit() {
    this.productDeletedSub = this.productsEventsService.productDeleted$.subscribe(() => {
      this.loadChartData();
      console.log('called');
    })
  }

  ngAfterViewInit(): void {
    this.loadChartData();
  }

  ngOnDestroy() {
    if (this.productDeletedSub) {
      this.productDeletedSub.unsubscribe();
    }
  }

  loadChartData() {
    this.data = [];
    this.productService.getAllProducts().subscribe(
      (response) => {
        if (response.success && response.products !== undefined) {
          const products = response.products;

          // Extract unique categories
          const categoriesSet = new Set<string>();
          products.forEach((product) => {
            if (product.product_category !== undefined) {
              categoriesSet.add(product.product_category);
            }
          });

          // Convert set to array
          this.categories = Array.from(categoriesSet);

          // Initialize a map to store quantities for each category
          const quantitiesMap = new Map<string, number>();

          // Count quantities for each category
          products.forEach((product) => {
            if (
              product.product_category !== undefined &&
              product.product_quantity !== undefined
            ) {
              const category = product.product_category;
              const quantity = product.product_quantity;

              quantitiesMap.set(
                category,
                (quantitiesMap.get(category) || 0) + quantity
              );
            }
          });

          // Populate data array with categories and quantities
          this.categories.forEach((category) => {
            const quantity = quantitiesMap.get(category) || 0;
            this.data.push({ y: category, x: quantity });
          });

          this.clearChart();
          this.createChart();
        } else {
          console.error('Failed to load products');
        }
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  createChart() {
    if (!this.chartCanvas) {
      console.error('Chart canvas element is not available.');
      return;
    }
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire context from the chart canvas.');
      return;
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.categories,
          datasets: [{
            label: 'Quantity per category',
            data: this.data,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          indexAxis: 'y',
        }
      });
  }

  clearChart() {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
}
