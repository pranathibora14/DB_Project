import org.apache.spark.sql.SQLContext
import org.apache.spark.{SparkConf, SparkContext}


object Script2{
  def main(args: Array[String]): Unit = {

    System.setProperty("hadoop.home.dir", "C:\\winutils")

    val conf = new SparkConf().setAppName("Joins").setMaster("local[*]")
    val sc = new SparkContext(conf)
    val sqlcontext = new SQLContext(sc)

    val studentdf = sqlcontext.read.option("header", true).csv("hdfs://localhost:9000/student_data.csv")
    val schooldf = sqlcontext.read.option("header", true).csv("hdfs://localhost:9000/school_data.csv")
    val majordf = sqlcontext.read.option("header", true).csv("hdfs://localhost:9000/major.csv")
    /*
    val join_inner = studentdf.join(schooldf, Seq("school_id"), "inner").join(majordf, Seq("major_id"), "inner")
    join_inner.show()


    val join_fullouter = studentdf.join(schooldf, Seq("school_id"), "fullouter").join(majordf, Seq("major_id"), "fullouter")
    join_fullouter.show()

    val join_left = studentdf.join(schooldf, Seq("school_id"), "left").join(majordf, Seq("major_id"), "left")
    join_left.show()*/



    val name = readLine("Enter name:")
  }

}