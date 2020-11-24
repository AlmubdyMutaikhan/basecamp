import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-singleproject',
  templateUrl: './singleproject.component.html',
  styleUrls: ['./singleproject.component.css']
})
export class SingleprojectComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }
  projectName : string

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.projectName = params.name
    })
  }

}
