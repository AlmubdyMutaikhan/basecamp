import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private userService: UserService) { }
  data: object[]
  projectName: string

  ngOnInit(): void {
    this.data = [{
      title: "Loading...",
      text: 'Please wait'
    },
    ]

    const user = JSON.parse(localStorage.getItem('user'))
    this.userService.loadProjects(user["_id"])
      .then(arr => {
        this.data = arr["projects"]
      })

  }

  addProject() {
    if (this.validate(this.projectName)) {
      let obj = {}
      obj["title"] = this.projectName
      this.data.push(obj)
      const user = JSON.parse(localStorage.getItem('user'))
      this.userService.addProject(user["_id"], this.projectName)
    }
  }

  validate(str) {
    return str.trim().length > 0
  }

}
